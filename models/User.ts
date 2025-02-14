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
    enum: ["free", "starter", "professional", "premium"],
    default: "free",
  },
  stripeCustomerId: String,
  subscriptionId: String,
  subscriptionStatus: {
    type: String,
    enum: ["active", "canceled", "past_due", "unpaid"],
    default: "active",
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
        type: {
          type: String,
          enum: ["subscription", "extra_doc"],
          default: "subscription",
        },
      },
    ],
    nextBillingDate: Date,
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
    researchCount: {
      type: Number,
      default: 0,
    },
    lastResearchDate: {
      type: Date,
      default: Date.now,
    },
    remainingCredits: {
      type: Number,
      default: 1,
    },
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  if (
    this.billing?.nextBillingDate &&
    new Date() > this.billing.nextBillingDate
  ) {
    this.plan = "free";
    if (!this.usage) {
      this.usage = {
        researchCount: 0,
        lastResearchDate: new Date(),
        remainingCredits: 1,
      };
    }
    this.usage.remainingCredits = 1;
    this.subscriptionStatus = "canceled";
  }
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.canUpgradePlan = function (newPlan: string) {
  const tiers = ["free", "starter", "professional", "premium"];
  return tiers.indexOf(newPlan) > tiers.indexOf(this.plan);
};

userSchema.methods.resetCredits = function () {
  switch (this.plan) {
    case "starter":
      this.usage.remainingCredits = 4;
      break;
    case "professional":
      this.usage.remainingCredits = 10;
      break;
    case "premium":
      this.usage.remainingCredits = 30;
      break;
    default:
      this.usage.remainingCredits = 1;
  }
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
