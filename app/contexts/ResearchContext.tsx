"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { toast } from "react-toastify";

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

interface ResearchContextType {
  isResearching: boolean;
  currentStatus: string[];
  requestId: string | null;
  researches: Research[];
  startResearch: (
    query: string,
    wordCount?: number,
    professional?: boolean
  ) => Promise<void>;
  checkStatus: () => Promise<void>;
  downloadResult: (requestId: string, query: string) => Promise<void>;
  fetchResearches: () => Promise<void>;
}

const ResearchContext = createContext<ResearchContextType | undefined>(
  undefined
);

export function ResearchProvider({ children }: { children: ReactNode }) {
  const [isResearching, setIsResearching] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<string[]>([]);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [researches, setResearches] = useState<Research[]>([]);

  // Load research state from localStorage on initial mount
  useEffect(() => {
    const storedRequestId = localStorage.getItem("currentResearchId");

    if (storedRequestId) {
      setRequestId(storedRequestId);
      setIsResearching(true);
      checkStatus(); // Check status immediately
    }
  }, []);

  const fetchResearches = useCallback(async () => {
    try {
      const response = await fetch("/api/research/list");
      if (!response.ok) throw new Error("Failed to fetch researches");
      const data = await response.json();
      setResearches(data);
    } catch (error) {
      console.error("Error fetching researches:", error);
    }
  }, []);

  const startResearch = async (
    query: string,
    wordCount?: number,
    professional: boolean = false
  ) => {
    try {
      const payload = {
        query,
        ...(wordCount && { wordCount }),
        professional,
      };

      const response = await fetch("/api/research/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Save to localStorage
      localStorage.setItem("currentResearchId", data.requestId);
      localStorage.setItem("currentResearchQuery", query);

      await fetch("/api/research/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: data.requestId,
          query,
          title: query,
          wordCount,
          professional,
        }),
      });

      setRequestId(data.requestId);
      setIsResearching(true);
      setCurrentStatus(["Starting research..."]);

      await fetchResearches();
    } catch (error) {
      console.error("Error starting research:", error);
    }
  };

  const checkStatus = async () => {
    const storedRequestId = localStorage.getItem("currentResearchId");
    const currentRequestId = requestId || storedRequestId;

    if (!currentRequestId) return;

    try {
      const response = await fetch(`/api/research/status/${currentRequestId}`);
      if (!response.ok) {
        throw new Error("Failed to check status");
      }

      const data = await response.json();

      if (data.error) {
        console.error("Status check error:", data.error);
        setIsResearching(false);
        localStorage.removeItem("currentResearchId");
        localStorage.removeItem("currentResearchQuery");
        setCurrentStatus((prevStatus) => [
          ...prevStatus,
          "Research process failed",
        ]);
        toast.error(data.error);
        await fetchResearches();
        return;
      }

      if (Array.isArray(data.status)) {
        setCurrentStatus(data.status);
      } else if (typeof data.status === "string") {
        setCurrentStatus([data.status]);
      }

      if (data.status?.includes("COMPLETED")) {
        setIsResearching(false);
        localStorage.removeItem("currentResearchId");
        localStorage.removeItem("currentResearchQuery");
        await fetchResearches();
        toast.success("Research completed successfully!");
      }
    } catch (error) {
      console.error("Error checking status:", error);
      toast.error("Failed to check research status. Retrying...");
    }
  };

  const downloadResult = async (requestId: string, query: string) => {
    if (!requestId) return;
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
      console.error("Error downloading result:", error);
      toast.error("Failed to download research");
    }
  };

  return (
    <ResearchContext.Provider
      value={{
        isResearching,
        currentStatus,
        requestId,
        researches,
        startResearch,
        checkStatus,
        downloadResult,
        fetchResearches,
      }}
    >
      {children}
    </ResearchContext.Provider>
  );
}

export const useResearch = () => {
  const context = useContext(ResearchContext);
  if (context === undefined) {
    throw new Error("useResearch must be used within a ResearchProvider");
  }
  return context;
};
