import User from "@/models/User";
import { getStripeInstance } from "@/lib/stripe";

export class PlanService {
  static async handlePlanUpgrade(userId: string, newPlan: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (!user.canUpgradePlan(newPlan)) {
      throw new Error("Invalid plan upgrade path");
    }

    user.plan = newPlan;
    user.resetCredits();
    await user.save();

    return user;
  }

  static async handlePlanExpiration(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const stripe = getStripeInstance();

    if (user.subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(
        user.subscriptionId
      );

      if (subscription.status !== "active") {
        user.plan = "free";
        user.usage.remainingCredits = 1;
        user.subscriptionStatus = "canceled";
        await user.save();
      }
    }

    return user;
  }

  static async checkPlanValidity(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (
      user.billing?.nextBillingDate &&
      new Date() > user.billing.nextBillingDate
    ) {
      return this.handlePlanExpiration(userId);
    }

    return user;
  }
}
