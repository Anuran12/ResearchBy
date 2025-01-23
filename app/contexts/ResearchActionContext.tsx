"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { ResearchPaper } from "@/data/research";

type ModalType = "download" | "edit" | "delete";

interface ResearchActionContextType {
  isModalOpen: boolean;
  modalType: ModalType | null;
  selectedPaper: ResearchPaper | null;
  openModal: (type: ModalType, paper: ResearchPaper) => void;
  closeModal: () => void;
  handleConfirm: () => void;
}

const ResearchActionContext = createContext<
  ResearchActionContextType | undefined
>(undefined);

export function ResearchActionProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(
    null
  );

  const openModal = (type: ModalType, paper: ResearchPaper) => {
    setModalType(type);
    setSelectedPaper(paper);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedPaper(null);
  };

  const handleConfirm = () => {
    if (!selectedPaper || !modalType) return;

    switch (modalType) {
      case "download":
        // Implement download logic
        console.log("Downloading paper:", selectedPaper.title);
        break;
      case "edit":
        // Implement edit logic
        console.log("Editing paper:", selectedPaper.title);
        break;
      case "delete":
        // Implement delete logic
        console.log("Deleting paper:", selectedPaper.title);
        break;
    }

    closeModal();
  };

  return (
    <ResearchActionContext.Provider
      value={{
        isModalOpen,
        modalType,
        selectedPaper,
        openModal,
        closeModal,
        handleConfirm,
      }}
    >
      {children}
    </ResearchActionContext.Provider>
  );
}

export function useResearchAction() {
  const context = useContext(ResearchActionContext);
  if (context === undefined) {
    throw new Error(
      "useResearchAction must be used within a ResearchActionProvider"
    );
  }
  return context;
}
