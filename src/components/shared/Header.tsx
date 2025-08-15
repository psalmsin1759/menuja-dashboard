"use client";

import { useState, useRef, useEffect } from "react";
import { FaBars, FaUserEdit, FaKey, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import Link from "next/link";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    // Add logout logic here
    alert("Logged out");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-30">
      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button onClick={toggleSidebar}>
          <FaBars size={20} />
        </button>
      </div>

      {/* Logo or Title */}
      <h1 className="text-xl font-bold">My Dashboard</h1>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="flex items-center text-sm text-gray-700 gap-2 focus:outline-none"
        >
          Welcome, Admin <FaChevronDown size={14} />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-52 bg-white border rounded-md shadow-lg z-50 animate-fade-in">
            <ul className="py-1 text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <FaUserEdit className="text-gray-500" />
                <Link href="/dashboard/profile">Edit Profile</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <FaKey className="text-gray-500" />
                <Link href="/dashboard/change-password">Change Password</Link>
              </li>
              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer flex items-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
