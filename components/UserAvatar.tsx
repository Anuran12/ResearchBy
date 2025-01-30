import { useState, useEffect } from "react";
import Image from "next/image";

interface UserAvatarProps {
  name: string;
  image?: string | null;
  signupMethod: string;
  size?: "sm" | "md" | "lg";
}

export default function UserAvatar({
  name,
  image,
  signupMethod,
  size = "md",
}: UserAvatarProps) {
  const [initials, setInitials] = useState("");

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-lg",
    lg: "w-16 h-16 text-2xl",
  };

  useEffect(() => {
    if (name) {
      const nameInitials = name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
      setInitials(nameInitials);
    }
  }, [name]);

  if (
    (signupMethod === "google" && image) ||
    (image && image.startsWith("data:"))
  ) {
    return (
      <Image
        src={image}
        alt={name}
        width={size === "sm" ? 32 : size === "md" ? 48 : 64}
        height={size === "sm" ? 32 : size === "md" ? 48 : 64}
        className={`rounded-full ${sizeClasses[size]}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold`}
    >
      {initials}
    </div>
  );
}
