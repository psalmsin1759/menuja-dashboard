import AnalyticsSummary from "@/components/dashboard/AnalyticsSummary";
import MostSoldFood from "@/components/dashboard/MostSoldFood";
import QRCodeScanCount from "@/components/dashboard/QRCodeScanCount";
import RevenueGraph from "@/components/dashboard/RevenueGraph";

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <div className="grid col-span-2 gap-8">
        <AnalyticsSummary />
        <RevenueGraph />
      </div>
      <div className="grid col-span-1 gap-8">
        <QRCodeScanCount />
        <MostSoldFood />

      </div>
    </main>
  );
}
