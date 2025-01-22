"use client";
import { useState } from "react";
import Image from "next/image";
import AvatarDropdown from "@/components/AvatarDropdown";
import Avatar from "@/assets/avatar.png";

export default function Profile() {
  const [name, setName] = useState("Alex Thompson");
  const [email, setEmail] = useState("alex@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password update logic here
  };

  return (
    <div className="w-[80%] py-6 px-5 flex flex-col gap-6">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <AvatarDropdown />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Profile Information */}
        <div className="border rounded-lg p-6 shadow-custom-1">
          <h2 className="text-lg font-semibold mb-6">Profile Information</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={Avatar}
                alt="avatar"
                className="w-16 h-16 rounded-full"
              />
              <button className="text-blue-600 hover:underline">
                Change Avatar
              </button>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg"
                disabled
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Password Section */}
        <div className="border rounded-lg p-6 shadow-custom-1">
          <h2 className="text-lg font-semibold mb-6">Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3 border rounded-lg"
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
                className="w-full p-3 border rounded-lg"
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
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Billing Section */}
        <div className="border rounded-lg p-6 shadow-custom-1">
          <h2 className="text-lg font-semibold mb-6">Billing</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm text-gray-600 mb-4">Payment Methods</h3>
              <div className="flex items-center justify-between p-3 border rounded-lg mb-4">
                <div className="flex items-center gap-4">
                  <span>•••• •••• •••• 4242</span>
                  <span className="text-sm text-gray-500">Expires 12/25</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded">✏️</button>
                  <button className="p-2 hover:bg-gray-100 rounded">🗑️</button>
                </div>
              </div>
              <button className="flex items-center gap-2 text-blue-600 hover:underline">
                <span>+</span> Add Payment Method
              </button>
            </div>

            <div>
              <h3 className="text-sm text-gray-600 mb-4">Billing History</h3>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div>Invoice #2024001</div>
                  <div className="text-sm text-gray-500">2024-01-13</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-500">Paid</span>
                  <button className="text-blue-600 hover:underline">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Section */}
        <div className="border rounded-lg p-6 shadow-custom-1">
          <h2 className="text-lg font-semibold mb-6">Plan</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm text-gray-600 mb-4">Current Plan</h3>
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-semibold">Professional</h4>
                    <p className="text-sm text-gray-500">
                      Next billing date: 2025-02-13
                    </p>
                  </div>
                  <button className="text-blue-600 hover:underline">
                    Cancel Plan
                  </button>
                </div>
                <div className="text-sm">
                  <div>• 5 researches/month</div>
                  <div>• Basic sources</div>
                  <div>• Standard support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
