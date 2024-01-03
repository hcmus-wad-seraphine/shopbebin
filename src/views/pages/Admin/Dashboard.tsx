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
    <div className="w-full gap-10">
      <div className="flex-col w-[60%]">
        <h1>Report revenue</h1>

        <select
          className="self-start"
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
        <h1>Today orders</h1>
        <div className="flex-col overflow-scroll"></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
