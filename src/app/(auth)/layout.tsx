import type { Metadata } from "next";
import { Antonio } from "next/font/google";
import "../globals.css";
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: "Menuja",
  description: "Menuja — Smart Digital Menu",
};

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={antonio.className}>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            {children}
            <ToastContainer />
          </div>
        </div>
      </body>
    </html>
  );
}
