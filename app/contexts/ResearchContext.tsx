"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ResearchContextType {
  isResearching: boolean;
  currentStatus: string[];
  requestId: string | null;
  startResearch: (
    query: string,
    wordCount?: number,
    professional?: boolean
  ) => Promise<void>;
  checkStatus: () => Promise<void>;
  downloadResult: () => Promise<void>;
}

const ResearchContext = createContext<ResearchContextType | undefined>(
  undefined
);

export function ResearchProvider({ children }: { children: ReactNode }) {
  const [isResearching, setIsResearching] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string[]>([]);
  const [requestId, setRequestId] = useState<string | null>(null);

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

      const response = await fetch(
        "http://ec2-54-177-139-194.us-west-1.compute.amazonaws.com:3000/api/research/start",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      setRequestId(data.requestId);
      setIsResearching(true);
      setCurrentStatus(["Starting research..."]);
    } catch (error) {
      console.error("Error starting research:", error);
    }
  };

  const checkStatus = async () => {
    if (!requestId) return;

    try {
      const response = await fetch(
        `http://ec2-54-177-139-194.us-west-1.compute.amazonaws.com:3000/api/research/status/${requestId}`
      );
      const data = await response.json();
      setCurrentStatus(data.status);

      if (data.status.includes("COMPLETED")) {
        setIsResearching(false);
      }
    } catch (error) {
      console.error("Error checking status:", error);
    }
  };

  const downloadResult = async () => {
    if (!requestId) return;

    try {
      const response = await fetch(
        `http://ec2-54-177-139-194.us-west-1.compute.amazonaws.com:3000/api/research/download/${requestId}`
      );
      const contentType = response.headers.get("content-type");
      const blob = await response.blob();

      const fileExtension = contentType?.includes("markdown") ? "md" : "docx";
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `research-result.${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading result:", error);
    }
  };

  return (
    <ResearchContext.Provider
      value={{
        isResearching,
        currentStatus,
        requestId,
        startResearch,
        checkStatus,
        downloadResult,
      }}
    >
      {children}
    </ResearchContext.Provider>
  );
}

export function useResearch() {
  const context = useContext(ResearchContext);
  if (context === undefined) {
    throw new Error("useResearch must be used within a ResearchProvider");
  }
  return context;
}
