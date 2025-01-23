"use client";
import { useResearchAction } from "@/app/contexts/ResearchActionContext";

export default function ResearchActionModal() {
  const { isModalOpen, modalType, selectedPaper, closeModal, handleConfirm } =
    useResearchAction();

  if (!isModalOpen || !modalType) return null;

  const modalContent = {
    download: {
      title: "Download Research Paper",
      message: selectedPaper
        ? `Are you sure you want to download "${selectedPaper.title}"?`
        : "",
    },
    edit: {
      title: "Edit Research Paper",
      message: selectedPaper
        ? `Do you want to edit "${selectedPaper.title}"?`
        : "",
    },
    delete: {
      title: "Delete Research Paper",
      message: selectedPaper
        ? `Are you sure you want to delete "${selectedPaper.title}"? This action cannot be undone.`
        : "",
    },
    profile_save: {
      title: "Save Profile Changes",
      message: "Are you sure you want to save these profile changes?",
    },
    password_update: {
      title: "Update Password",
      message: "Are you sure you want to update your password?",
    },
  };

  const content = modalContent[modalType];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">{content.title}</h2>
        <p className="text-gray-600 mb-6">{content.message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
