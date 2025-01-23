"use client";
import { useState, useMemo } from "react";
import {
  FiDownload,
  FiEdit3,
  FiTrash2,
  FiStar,
  FiSearch,
} from "react-icons/fi";
import { researchPapers, type ResearchPaper } from "@/data/research";
import AvatarDropdown from "@/components/AvatarDropdown";

export default function History() {
  const [papers, setPapers] = useState<ResearchPaper[]>(researchPapers);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFavorite = (id: string) => {
    setPapers(
      papers.map((paper) =>
        paper.id === id ? { ...paper, favorite: !paper.favorite } : paper
      )
    );
  };

  // Filter and sort papers based on search term, time filter, and sort option
  const filteredPapers = useMemo(() => {
    let filtered = [...papers];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (paper) =>
          paper.title.toLowerCase().includes(searchLower) ||
          paper.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply time filter
    const now = new Date();
    if (timeFilter === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((paper) => new Date(paper.date) >= weekAgo);
    } else if (timeFilter === "month") {
      const monthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      filtered = filtered.filter((paper) => new Date(paper.date) >= monthAgo);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "wordCount":
          return b.wordCount - a.wordCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [papers, searchTerm, timeFilter, sortBy]);

  return (
    <div className="w-full py-4 px-4 flex flex-col gap-4">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-xl lg:text-2xl font-bold">History</h1>
        <AvatarDropdown />
      </div>
      {/* Search and Filter Section */}
      <div className="flex flex-col lg:flex-row gap-4 shadow-custom-1 hover:shadow-custom-2 p-4 bg-[#F9FAFB]">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search in history..."
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

      {/* History Items */}
      <div className="flex flex-col gap-4">
        {filteredPapers.map((paper) => (
          <div
            key={paper.id}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border rounded-lg shadow-custom-1 hover:shadow-custom-2 gap-4"
          >
            <div className="flex items-start lg:items-center gap-4">
              <div className="text-blue-600">
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
                  <span>{paper.date}</span>
                  <span>{paper.wordCount} words</span>
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
              <button className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-lg">
                <FiDownload className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
              </button>
              <button className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-lg">
                <FiEdit3 className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
              </button>
              <button className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-lg">
                <FiTrash2 className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
              </button>
              <button
                className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => handleFavorite(paper.id)}
              >
                <FiStar
                  className={`w-4 h-4 lg:w-5 lg:h-5 ${
                    paper.favorite
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-600"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
