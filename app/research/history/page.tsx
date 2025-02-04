"use client";
import { useState, useEffect } from "react";
import { FiDownload, FiTrash2, FiStar, FiSearch } from "react-icons/fi";
import { toast } from "react-hot-toast";
import AvatarDropdown from "@/components/AvatarDropdown";
import { useResearch } from "@/app/contexts/ResearchContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function History() {
  const { researches, fetchResearches } = useResearch();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    fetchResearches();
  }, []);

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

  const handleFavorite = async (research: any) => {
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

  // Filter and sort researches
  const filteredResearches = researches
    .filter((research) => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return research.title.toLowerCase().includes(searchLower);
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "wordCount":
          return (b.wordCount || 0) - (a.wordCount || 0);
        default:
          return 0;
      }
    });

  return (
    <ProtectedRoute>
      <div className="w-full py-4 lg:py-6 px-4 lg:px-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl lg:text-2xl font-bold">Research History</h1>
          <AvatarDropdown />
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search researches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border rounded-lg"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="wordCount">Sort by Word Count</option>
          </select>
        </div>

        {/* Research List */}
        <div className="space-y-4">
          {filteredResearches.map((research) => (
            <div
              key={research.requestId}
              className="bg-white p-4 rounded-lg border flex justify-between items-center"
            >
              <div className="flex-1">
                <h3 className="font-medium mb-2">{research.title}</h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                  <span>
                    {new Date(research.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        research.status === "completed"
                          ? "bg-green-500"
                          : research.status === "in_progress"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      }`}
                    />
                    {research.status}
                  </span>
                  <span className="text-blue-600">{research.networkType}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {research.status === "completed" && (
                  <button
                    onClick={() =>
                      handleDownload(research.requestId, research.query)
                    }
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Download"
                  >
                    <FiDownload className="w-5 h-5 text-gray-600" />
                  </button>
                )}
                <button
                  onClick={() => handleFavorite(research)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  title={
                    research.favorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <FiStar
                    className={`w-5 h-5 ${
                      research.favorite
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                </button>
                <button
                  onClick={() => handleDelete(research.requestId)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-red-500 hover:text-red-600"
                  title="Delete"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
