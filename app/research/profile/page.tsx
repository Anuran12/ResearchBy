"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import AvatarDropdown from "@/components/AvatarDropdown";
// import { useResearchAction } from "@/app/contexts/ResearchActionContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  plan: string;
  billing: {
    paymentMethods: Array<{
      last4: string;
      expiryMonth: number;
      expiryYear: number;
      type: string;
    }>;
    invoices: Array<{
      invoiceId: string;
      amount: number;
      date: string;
      status: string;
      downloadUrl: string;
      type?: "subscription" | "extra_doc";
    }>;
    nextBillingDate: Date;
  };
  settings: {
    display: {
      theme: string;
      fontSize: string;
      language: string;
    };
    research: {
      defaultWordCount: number;
      defaultCitationStyle: string;
      includeMetadata: boolean;
      saveHistory: boolean;
      autoSave: boolean;
    };
  };
  usage: {
    researchCount: number;
    lastResearchDate: Date;
    remainingCredits: number;
  };
  createdAt: Date;
  lastLogin: Date;
  signupMethod: string;
}

export default function Profile() {
  const { data: session } = useSession();
  // const { openModal } = useResearchAction();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, [session]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("success") === "true") {
      toast.success("Plan upgraded successfully!");
    }

    const error = urlParams.get("error");
    if (error) {
      const errorMessages: Record<string, string> = {
        missing_session: "Invalid checkout session",
        invalid_session: "Invalid checkout session",
        user_not_found: "User not found",
        internal_error: "An error occurred during checkout",
      };
      toast.error(errorMessages[error] || "An error occurred");
    }
  }, []);

  useEffect(() => {
    const checkPlanValidity = async () => {
      try {
        const response = await fetch("/api/plans/check-validity");
        const data = await response.json();

        if (data.plan !== userProfile?.plan) {
          // Plan has changed
          fetchUserProfile(); // Refresh profile data
          // Show a one-time notification
          toast.error("Your plan has expired and been reset to Free plan", {
            id: "plan-expired", // Unique ID to prevent duplicate toasts
          });
        }
      } catch (error) {
        console.error("Error checking plan validity:", error);
      }
    };

    // Only set up interval if we have a userProfile
    if (userProfile) {
      const interval = setInterval(checkPlanValidity, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [userProfile?.plan]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/user/profile");
      if (!response.ok) throw new Error("Failed to fetch profile");
      const data = await response.json();
      setUserProfile(data);
      setName(data.name);
    } catch {
      toast.error("Error loading profile");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(saving);
    setSaving(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) throw new Error("Failed to update profile");
      const updatedProfile = await response.json();
      setUserProfile(updatedProfile);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const response = await fetch("/api/user/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) throw new Error("Failed to update password");
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Error updating password");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;

    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const response = await fetch("/api/user/avatar", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update avatar");

      const data = await response.json();
      setUserProfile((prev) =>
        prev ? { ...prev, avatar: data.avatar } : null
      );
      toast.success("Avatar updated successfully");
    } catch {
      toast.error("Failed to update avatar");
    } finally {
      setAvatarFile(null);
      setAvatarPreview(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="w-full py-4 lg:py-6 px-4 lg:px-5 flex flex-col gap-4 lg:gap-6">
        <div className="flex justify-between items-center w-full gap-4 lg:gap-0">
          <h1 className="text-lg lg:text-2xl font-bold pl-12 lg:pl-0">
            Account Settings
          </h1>
          <AvatarDropdown />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Profile Information */}
          <div className="border rounded-lg p-4 lg:p-6 shadow-custom-1">
            <h2 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6">
              Profile Information
            </h2>
            <form
              onSubmit={handleProfileSubmit}
              className="space-y-4 lg:space-y-6"
            >
              <div className="flex flex-col lg:flex-row items-center gap-4 mb-4 lg:mb-6">
                <UserAvatar
                  name={userProfile?.name || ""}
                  image={avatarPreview || userProfile?.avatar}
                  signupMethod={userProfile?.signupMethod || "credentials"}
                  size="lg"
                />
                <div className="flex flex-col gap-2">
                  <label className="cursor-pointer text-blue-600 hover:underline text-sm lg:text-base">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                    Change Avatar
                  </label>
                  {avatarFile && (
                    <button
                      onClick={handleAvatarUpload}
                      className="text-green-600 hover:underline text-sm lg:text-base"
                    >
                      Save Avatar
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 lg:p-3 border rounded-lg text-sm lg:text-base"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={userProfile?.email || ""}
                  className="w-full p-2 lg:p-3 border rounded-lg text-sm lg:text-base"
                  disabled
                />
              </div>

              <button
                type="submit"
                className="w-full lg:w-auto bg-blue-600 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-blue-700 text-sm lg:text-base"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Password Section */}
          {userProfile?.signupMethod === "credentials" ? (
            <div className="border rounded-lg p-4 lg:p-6 shadow-custom-1">
              <h2 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6">
                Password
              </h2>
              <form
                onSubmit={handlePasswordSubmit}
                className="space-y-4 lg:space-y-6"
              >
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-2 lg:p-3 border rounded-lg text-sm lg:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 lg:p-3 border rounded-lg text-sm lg:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 lg:p-3 border rounded-lg text-sm lg:text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full lg:w-auto bg-blue-600 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-blue-700 text-sm lg:text-base"
                >
                  Update Password
                </button>
              </form>
            </div>
          ) : (
            <div className="relative">
              {/* Overlay */}
              <div className="absolute inset-0 bg-gray-50/50 backdrop-blur-[2px] rounded-lg flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="bg-yellow-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#EAB308"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 8V12"
                        stroke="#EAB308"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 16H12.01"
                        stroke="#EAB308"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Password Management Unavailable
                  </h3>
                  <p className="text-gray-600">
                    Password management is handled through your Google account
                    settings since you signed up with Google.
                  </p>
                </div>
              </div>

              {/* Background Content */}
              <div className="border rounded-lg p-4 lg:p-6 shadow-custom-1">
                <h2 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6">
                  Password
                </h2>
                <form
                  onSubmit={handlePasswordSubmit}
                  className="space-y-4 lg:space-y-6"
                >
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full p-2 lg:p-3 border rounded-lg text-sm lg:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2 lg:p-3 border rounded-lg text-sm lg:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-2 lg:p-3 border rounded-lg text-sm lg:text-base"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full lg:w-auto bg-blue-600 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-blue-700 text-sm lg:text-base"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Billing Section */}
          <div className="border rounded-lg p-4 lg:p-6 shadow-custom-1">
            <h2 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6">
              Billing
            </h2>
            <div className="space-y-4 lg:space-y-6">
              {/* <div>
                <h3 className="text-sm text-gray-600 mb-3 lg:mb-4">
                  Payment Methods
                </h3>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-3 border rounded-lg mb-4 gap-2 lg:gap-0">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                    <span className="text-sm lg:text-base">
                      •••• •••• •••• 4242
                    </span>
                    <span className="text-sm text-gray-500">Expires 12/25</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-lg">
                      <FiEdit3 className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                    </button>
                    <button className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-lg">
                      <FiTrash2 className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-blue-600 hover:underline text-sm lg:text-base">
                  <span>+</span> Add Payment Method
                </button>
              </div> */}

              <div>
                <h3 className="text-sm text-gray-600 mb-3 lg:mb-4">
                  Billing History
                </h3>
                {userProfile?.billing?.invoices?.length ? (
                  <div className="space-y-3">
                    {userProfile.billing.invoices.map((invoice) => (
                      <div
                        key={invoice.invoiceId}
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-3 border rounded-lg gap-2 lg:gap-0"
                      >
                        <div>
                          <div className="text-sm lg:text-base">
                            {invoice.type === "extra_doc"
                              ? "Extra Document Purchase"
                              : `Invoice #${invoice.invoiceId.slice(-8)}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(invoice.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={`text-sm lg:text-base ${
                              invoice.status === "paid"
                                ? "text-green-500"
                                : "text-yellow-500"
                            }`}
                          >
                            {invoice.status.charAt(0).toUpperCase() +
                              invoice.status.slice(1)}
                          </span>
                          <span className="text-sm lg:text-base">
                            ${invoice.amount}
                          </span>
                          {invoice.downloadUrl && (
                            <button
                              onClick={() =>
                                window.open(invoice.downloadUrl, "_blank")
                              }
                              className="text-blue-600 hover:underline text-sm lg:text-base"
                            >
                              Download
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 p-3 border rounded-lg">
                    No billing history available
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Plan Section */}
          <div className="border rounded-lg p-4 lg:p-6 shadow-custom-1">
            <div className="flex justify-between items-center mb-4 lg:mb-6">
              <h2 className="text-base lg:text-lg font-semibold">
                Current Plan
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium mb-1">
                    {(userProfile?.plan || "Free").charAt(0).toUpperCase() +
                      (userProfile?.plan || "Free").slice(1)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {userProfile?.plan === "starter"
                      ? "4"
                      : userProfile?.plan === "professional"
                      ? "10"
                      : userProfile?.plan === "premium"
                      ? "30"
                      : "1"}{" "}
                    researches per month
                  </p>
                  <p className="text-sm text-gray-600">
                    {userProfile?.usage?.remainingCredits || 0} researches
                    remaining
                  </p>
                  {userProfile?.billing?.nextBillingDate && (
                    <p className="text-sm text-gray-600 mt-1">
                      Next billing date:{" "}
                      {new Date(
                        userProfile.billing.nextBillingDate
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <Link href="/research/plans">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                    Upgrade Plan
                  </button>
                </Link>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm text-gray-600">Usage This Month</h3>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${
                        (userProfile?.usage?.researchCount || 0) *
                        (userProfile?.plan === "starter"
                          ? 25
                          : userProfile?.plan === "professional"
                          ? 10
                          : userProfile?.plan === "premium"
                          ? 3.33
                          : 100)
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {userProfile?.usage?.researchCount || 0} /{" "}
                  {userProfile?.plan === "starter"
                    ? "4"
                    : userProfile?.plan === "professional"
                    ? "10"
                    : userProfile?.plan === "premium"
                    ? "30"
                    : "1"}{" "}
                  researches
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
