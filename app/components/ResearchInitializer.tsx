"use client";
import { useEffect } from "react";
import { useResearch } from "@/app/contexts/ResearchContext";

export default function ResearchInitializer() {
  const { fetchResearches } = useResearch();

  useEffect(() => {
    fetchResearches();
  }, []);

  return null;
}
