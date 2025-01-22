"use client";
import { useState } from "react";
import AvatarDropdown from "@/components/AvatarDropdown";

export default function Profile() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [bio, setBio] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log("Profile updated");
  };

  return (
    <div className="w-[80%] py-6 px-5 flex flex-col gap-6">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <AvatarDropdown />
      </div>

      <div className="border rounded-lg p-6 shadow-custom-1">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Name</label>
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

          <div>
            <label className="block text-sm text-gray-600 mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 border rounded-lg h-32"
              placeholder="Tell us about yourself..."
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
