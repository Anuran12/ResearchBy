"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
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
  downloadResult: (query: string) => Promise<void>;
  fetchResearches: () => Promise<void>;
}

const ResearchContext = createContext<ResearchContextType | undefined>(
  undefined
);

export function ResearchProvider({ children }: { children: ReactNode }) {
  const [isResearching, setIsResearching] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string[]>([]);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [researches, setResearches] = useState<Research[]>([]);

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
    if (!requestId) return;

    try {
      const response = await fetch(`/api/research/status/${requestId}`);
      const data = await response.json();
      setCurrentStatus(data.status);

      if (data.status.includes("COMPLETED")) {
        setIsResearching(false);
        await fetchResearches();
      }
    } catch (error) {
      console.error("Error checking status:", error);
    }
  };

  const downloadResult = async (query: string) => {
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
