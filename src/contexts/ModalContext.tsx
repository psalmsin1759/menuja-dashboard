"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ModalName = "addCategory" | "addFood" | "orderDetails" | 'addTable' | "addIntegration" | "addAdmin" | null;

interface ModalContextType {
  openModal: (modal: ModalName) => void;
  closeModal: () => void;
  activeModal: ModalName;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<ModalName>(null);

  const openModal = (modal: ModalName) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, activeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used inside ModalProvider");
  return context;
};
