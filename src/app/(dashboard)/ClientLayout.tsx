"use client";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/navigation/Sidebar";
import { ModalProvider } from "@/contexts/ModalContext";
import { SelectedCategoryProvider } from "@/contexts/SelectedCategoryContext";
import React, { useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <ModalProvider>
            <SelectedCategoryProvider>{children}</SelectedCategoryProvider>
          </ModalProvider>
        </main>

        <Footer />
      </div>
    </div>
  );
}
