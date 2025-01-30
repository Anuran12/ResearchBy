import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();

          // Add timeout to database query
          const user = await Promise.race([
            User.findOne({ email: credentials?.email }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Database timeout")), 5000)
            ),
          ]);

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isValid = await user.matchPassword(credentials?.password || "");

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDB();

          // Check if user exists
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create new user if doesn't exist
            await User.create({
              name: user.name,
              email: user.email,
              password: Math.random().toString(36).slice(-16),
              signupMethod: "google",
              avatar: user.image || "/default-avatar.png",
              plan: "free",
              billing: {
                paymentMethods: [],
                invoices: [],
                nextBillingDate: new Date(),
              },
              settings: {
                display: {
                  theme: "light",
                  fontSize: "medium",
                  language: "en",
                },
                research: {
                  defaultWordCount: 5000,
                  defaultCitationStyle: "MLA",
                  includeMetadata: false,
                  saveHistory: true,
                  autoSave: true,
                },
              },
              usage: {
                researchCount: 0,
                lastResearchDate: new Date(),
                remainingCredits: 1,
              },
              lastLogin: new Date(),
            });
          }
        } catch (error) {
          console.error("Error saving Google user:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user?.email) {
        try {
          await connectDB();
          const user = await User.findOne({ email: session.user.email });
          if (user) {
            session.user.id = user._id.toString();
            session.user.image = user.avatar;
            session.user.signupMethod = user.signupMethod;
          }
        } catch (error) {
          console.error("Session callback error:", error);
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
