export interface ResearchPaper {
  id: string;
  title: string;
  date: string;
  wordCount: number;
  status: "completed" | "in_progress" | "draft";
  networkType: "Professional Network" | "Academic Network" | "General";
  favorite: boolean;
  tags: string[];
  abstract?: string;
  citations?: number;
  lastModified: string;
}

export const researchPapers: ResearchPaper[] = [
  {
    id: "1",
    title: "Impact of AI on Healthcare Systems",
    date: "2024-01-10",
    wordCount: 3000,
    status: "completed",
    networkType: "Professional Network",
    favorite: true,
    tags: ["Healthcare", "AI", "Technology"],
    abstract:
      "A comprehensive analysis of artificial intelligence applications in modern healthcare systems.",
    citations: 45,
    lastModified: "2024-01-15",
  },
  {
    id: "2",
    title: "Sustainable Energy Solutions",
    date: "2024-01-08",
    wordCount: 5000,
    status: "completed",
    networkType: "Academic Network",
    favorite: false,
    tags: ["Environment", "Energy", "Sustainability"],
    abstract:
      "Exploring renewable energy technologies and their implementation.",
    citations: 32,
    lastModified: "2024-01-12",
  },
  {
    id: "3",
    title: "Machine Learning in Finance",
    date: "2024-01-05",
    wordCount: 4500,
    status: "in_progress",
    networkType: "Professional Network",
    favorite: true,
    tags: ["Finance", "Machine Learning", "Technology"],
    abstract: "Analysis of ML applications in financial markets and trading.",
    citations: 28,
    lastModified: "2024-01-09",
  },
  {
    id: "4",
    title: "Digital Transformation in Education",
    date: "2024-01-03",
    wordCount: 3500,
    status: "completed",
    networkType: "Academic Network",
    favorite: false,
    tags: ["Education", "Technology", "Digital"],
    abstract: "Study of digital technologies impact on educational systems.",
    citations: 37,
    lastModified: "2024-01-07",
  },
];
