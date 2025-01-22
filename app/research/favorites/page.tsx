"use client";
import { useState } from "react";
import Image from "next/image";
import { FiDownload, FiEdit3, FiTrash2, FiStar } from "react-icons/fi";
import Avatar from "@/assets/avatar.png";
import { researchPapers, type ResearchPaper } from "@/data/research";

export default function Favorites() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      {/* Add your favorites content here */}
    </div>
  );
}
