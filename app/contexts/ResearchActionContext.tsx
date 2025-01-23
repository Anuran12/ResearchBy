"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { ResearchPaper } from "@/data/research";

type ModalType = "download" | "edit" | "delete" | "profile_save" | "password_update";

interface ResearchActionContextType {
  isModalOpen: boolean;
  modalType: ModalType | null;
  selectedPaper: ResearchPaper | null;
  profileData?: {
    type: "profile" | "password";
    data: any;
  };
  openModal: (type: ModalType, paper?: ResearchPaper, data?: any) => void;
  closeModal: () => void;
  handleConfirm: () => void;
}

const ResearchActionContext = createContext<
  ResearchActionContextType | undefined
>(undefined);

export function ResearchActionProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [profileData, setProfileData] = useState<any>(null);

  const openModal = (type: ModalType, paper?: ResearchPaper, data?: any) => {
    setModalType(type);
    if (paper) setSelectedPaper(paper);
    if (data) setProfileData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedPaper(null);
    setProfileData(null);
  };

  const handleConfirm = () => {
    if (!modalType) return;

    switch (modalType) {
      case "download":
      case "edit":
      case "delete":
        if (!selectedPaper) return;
        console.log(`${modalType}ing paper:`, selectedPaper.title);
        break;
      case "profile_save":
        if (!profileData) return;
        console.log("Saving profile changes:", profileData);
        break;
      case "password_update":
        if (!profileData) return;
        console.log("Updating password:", profileData);
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
        profileData,
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
