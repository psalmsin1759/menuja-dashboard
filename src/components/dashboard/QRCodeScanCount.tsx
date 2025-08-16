"use client";

import { qrScanStats } from "@/constants/data";

export default function QRCodeScanCount() {
  return (
    <div className="w-full bg-white shadow-sm rounded-lg border border-gray-100 p-4">
      <h3 className="text-lg font-semibold mb-4">QR Code Scan Counts</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider border-b">
            <tr>
              <th className="px-4 py-3">Table</th>
              <th className="px-4 py-3">Scan Count</th>
            </tr>
          </thead>
          <tbody>
            {qrScanStats.map(({ tableNumber, scanCount }) => (
              <tr key={tableNumber} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-700">Table {tableNumber}</td>
                <td className="px-4 py-2">{scanCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
