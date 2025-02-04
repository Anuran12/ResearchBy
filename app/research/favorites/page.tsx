"use client";
import { useState, useEffect } from "react";
import { FiDownload, FiTrash2, FiStar, FiSearch } from "react-icons/fi";
import { toast } from "react-hot-toast";
import AvatarDropdown from "@/components/AvatarDropdown";
import { useResearch } from "@/app/contexts/ResearchContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useResearchAction } from "@/app/contexts/ResearchActionContext";
import { ResearchPaper } from "@/data/research";

interface Research {
  requestId: string;
  title: string;
  query: string;
  wordCount?: number;
  professional: boolean;
  status: "in_progress" | "completed" | "failed";
  networkType: "Professional Network" | "General";
  favorite: boolean;
  tags?: string[];
  lastModified: Date;
  createdAt: Date;
}

export default function Favorites() {
  const { researches, fetchResearches } = useResearch();
  const { openModal } = useResearchAction();
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    fetchResearches();
  }, [fetchResearches]);

  const handleDownload = async (requestId: string, query: string) => {
    try {
      const response = await fetch(`/api/research/download/${requestId}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const filename = query.replace(/\s+/g, "-");
      a.download = `${filename}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Research downloaded successfully");
    } catch (error) {
      console.error("Error downloading research:", error);
      toast.error("Failed to download research");
    }
  };

  const handleDelete = async (requestId: string) => {
    if (!window.confirm("Are you sure you want to delete this research?")) {
      return;
    }

    try {
      const response = await fetch(
        `/api/research/save?requestId=${requestId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        await fetchResearches();
        toast.success("Research deleted successfully");
      } else {
        throw new Error("Failed to delete research");
      }
    } catch (error) {
      console.error("Error deleting research:", error);
      toast.error("Failed to delete research");
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFavorite = async (research: Research) => {
    try {
      const response = await fetch(`/api/research/save`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: research.requestId,
          favorite: !research.favorite,
        }),
      });

      if (response.ok) {
        await fetchResearches();
        toast.success(
          research.favorite ? "Removed from favorites" : "Added to favorites"
        );
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      toast.error("Failed to update favorite status");
    }
  };

  useEffect(() => {
    fetchResearches();
  }, [fetchResearches]);
  // Filter and sort papers based on search term, time filter, and sort option
  const filteredFavorites = researches.filter((paper) => paper.favorite);

  return (
    <ProtectedRoute>
      <div className="w-full py-4 px-4 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-xl lg:text-2xl font-bold">
            Favorite Research Papers
          </h1>
          <AvatarDropdown />
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col lg:flex-row gap-4 shadow-custom-1 hover:shadow-custom-2 p-4 bg-[#F9FAFB]">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search in favorites..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full p-2 pr-10 border rounded-lg"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <FiSearch />
            </button>
          </div>
          <div className="flex gap-2">
            <select
              className="px-2 py-2 border rounded-lg min-w-[100px]"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
            <select
              className="px-2 py-2 border rounded-lg min-w-[100px]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Name</option>
              <option value="wordCount">Sort by Word Count</option>
            </select>
          </div>
        </div>

        {/* Favorites List */}
        <div className="flex flex-col gap-4">
          {filteredFavorites.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm
                ? "No matching favorites found"
                : "No favorite papers yet"}
            </div>
          ) : (
            filteredFavorites.map((paper) => (
              <div
                key={paper.requestId}
                className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border rounded-lg shadow-custom-1 hover:shadow-custom-2 gap-4"
              >
                <div className="flex items-start lg:items-center gap-4">
                  <div className="text-blue-600">
                    {/* Document SVG icon - same as in history page */}
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5553 2.88687H7.39004C6.79093 2.88687 6.21636 3.12487 5.79273 3.5485C5.3691 3.97213 5.1311 4.5467 5.1311 5.14581V23.2173C5.1311 23.8164 5.3691 24.391 5.79273 24.8146C6.21636 25.2382 6.79093 25.4762 7.39004 25.4762H20.9437C21.5428 25.4762 22.1173 25.2382 22.541 24.8146C22.9646 24.391 23.2026 23.8164 23.2026 23.2173V8.53421L17.5553 2.88687Z"
                        stroke="#2563EB"
                        strokeWidth="2.25894"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.4248 2.88687V7.40474C16.4248 8.00385 16.6628 8.57842 17.0864 9.00205C17.5101 9.42569 18.0846 9.66368 18.6837 9.66368H23.2016"
                        stroke="#2563EB"
                        strokeWidth="2.25894"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9071 10.7931H9.64819"
                        stroke="#2563EB"
                        strokeWidth="2.25894"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.6839 15.3109H9.64819"
                        stroke="#2563EB"
                        strokeWidth="2.25894"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.6839 19.8289H9.64819"
                        stroke="#2563EB"
                        strokeWidth="2.25894"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">{paper.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                      <span>
                        {new Date(paper.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        {paper.status === "completed"
                          ? "Completed"
                          : paper.status === "in_progress"
                          ? "In Progress"
                          : "Draft"}
                      </span>
                      <span className="text-blue-600">{paper.networkType}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 lg:gap-4">
                  {paper.status === "completed" && (
                    <button
                      onClick={() =>
                        handleDownload(paper.requestId, paper.query)
                      }
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Download"
                    >
                      <FiDownload className="w-5 h-5 text-gray-600" />
                    </button>
                  )}
                  <button
                    onClick={() => handleFavorite(paper)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title={
                      paper.favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    <FiStar
                      className={`w-5 h-5 ${
                        paper.favorite
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(paper.requestId)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-red-500 hover:text-red-600"
                    title="Delete"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
