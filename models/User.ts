import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  signupMethod: {
    type: String,
    enum: ["credentials", "google"],
    default: "credentials",
  },
  avatar: {
    type: String,
    default: "/default-avatar.png",
  },
  plan: {
    type: String,
    enum: ["free", "starter", "professional"],
    default: "free",
  },
  billing: {
    paymentMethods: [
      {
        last4: String,
        expiryMonth: Number,
        expiryYear: Number,
        type: String,
      },
    ],
    invoices: [
      {
        invoiceId: String,
        amount: Number,
        date: Date,
        status: {
          type: String,
          enum: ["paid", "pending", "failed"],
        },
        downloadUrl: String,
      },
    ],
    nextBillingDate: { type: Date, default: Date.now },
  },
  settings: {
    display: {
      theme: { type: String, default: "light" },
      fontSize: { type: String, default: "medium" },
      language: { type: String, default: "en" },
    },
    research: {
      defaultWordCount: { type: Number, default: 5000 },
      defaultCitationStyle: { type: String, default: "MLA" },
      includeMetadata: { type: Boolean, default: false },
      saveHistory: { type: Boolean, default: true },
      autoSave: { type: Boolean, default: true },
    },
  },
  usage: {
    researchCount: { type: Number, default: 0 },
    lastResearchDate: { type: Date, default: Date.now },
    remainingCredits: { type: Number, default: 1 },
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  stripeCustomerId: String,
  subscriptionId: String,
  subscriptionStatus: {
    type: String,
    enum: ["active", "canceled", "past_due", "unpaid"],
    default: "active",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);
