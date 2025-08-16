"use client";

import { Dispatch, SetStateAction } from "react";
import { FaTimes } from "react-icons/fa";
import { menuItems } from "@/constants/data";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/shared/Logo";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
     
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed z-50 md:static md:translate-x-0 bg-white w-64 h-full p-5 shadow-md transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
       
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

       
        <div className="mb-8">
          <Logo />
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded 
                hover:bg-gray-100 text-gray-700 ${
                  isActive ? "bg-gray-100 font-semibold" : ""
                }`}
              >
                <item.icon
                  className={`text-xl transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-gray-400"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
