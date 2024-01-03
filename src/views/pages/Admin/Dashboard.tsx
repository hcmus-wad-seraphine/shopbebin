import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

enum Period {
  Daily = "Daily",
  Weekly = "Weekly",
  Yearly = "Yearly",
}

const AdminDashboard = () => {
  const [period, setPeriod] = useState(Period.Daily);

  return (
    <div className="w-full gap-10 py-10">
      <div className="flex-col w-[60%] gap-4">
        <h1 className="text-2xl font-semibold">Report revenue</h1>

        <select
          className="self-start border-2 border-primary rounded-full px-2"
          value={period}
          onChange={(e) => {
            setPeriod(e.target.value as Period);
          }}
        >
          <option>{Period.Daily}</option>
          <option>{Period.Weekly}</option>
          <option>{Period.Yearly}</option>
        </select>

        {/* <Bar
          data={{
            datasets: [],
          }}
          options={}
        /> */}
      </div>

      <div className="flex-col w-[40%]">
        <h1 className="text-2xl font-semibold">Today orders</h1>
        <div className="flex-col overflow-scroll"></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
