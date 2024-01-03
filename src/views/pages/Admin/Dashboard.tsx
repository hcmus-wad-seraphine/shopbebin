import { type Order, OrderStatus } from "@prisma/client";
import { appState } from "@views/valtio";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSnapshot } from "valtio";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

enum Period {
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Yearly",
}

const getLabels = (period: Period) => {
  switch (period) {
    case Period.Daily:
      return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    case Period.Weekly:
      return ["Week 1", "Week 2", "Week 3", "Week 4"];
    case Period.Monthly:
      return [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
  }
};

const getData = (period: Period, orders: Order[]) => {
  const data = [];

  switch (period) {
    case Period.Daily:
      for (let i = 0; i < 7; i++) {
        const day = new Date();
        day.setDate(day.getDate() - i);

        const dayOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return (
            orderDate.getDate() === day.getDate() &&
            orderDate.getMonth() === day.getMonth() &&
            orderDate.getFullYear() === day.getFullYear()
          );
        });

        data.push(dayOrders.reduce((acc, cur) => acc + cur.price, 0));
      }
      break;
    case Period.Weekly:
      for (let i = 0; i < 4; i++) {
        const weekOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return (
            orderDate.getDate() >= 7 * i &&
            orderDate.getDate() <= 7 * (i + 1) &&
            orderDate.getMonth() === new Date().getMonth() &&
            orderDate.getFullYear() === new Date().getFullYear()
          );
        });

        data.push(weekOrders.reduce((acc, cur) => acc + cur.price, 0));
      }
      break;
    case Period.Monthly:
      for (let i = 0; i < 12; i++) {
        const monthOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate.getMonth() === i && orderDate.getFullYear() === new Date().getFullYear();
        });

        data.push(monthOrders.reduce((acc, cur) => acc + cur.price, 0));
      }
      break;
  }

  return data;
};

const AdminDashboard = () => {
  const profileSnap = useSnapshot(appState).profile;

  const [period, setPeriod] = useState(Period.Daily);
  const [deliveredOrders, setDeliveredOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      const res = await fetch(`/api/orders/status/${OrderStatus.PREPARING}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${profileSnap?.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setDeliveredOrders(data);
    };

    fetchDeliveredOrders().catch(console.error);
  }, [profileSnap?.token]);

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
          <option>{Period.Monthly}</option>
        </select>

        <Bar
          data={{
            labels: getLabels(period),
            datasets: [
              {
                label: "Revenue",
                data: getData(period, deliveredOrders),
                backgroundColor: "#3B82F6",
                borderColor: "#3B82F6",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
              },
              title: {
                display: true,
                text: `Revenue ${period}`,
              },
            },
          }}
        />
      </div>

      <div className="flex-col w-[40%]">
        <h1 className="text-2xl font-semibold">Today orders</h1>
        <div className="flex-col overflow-scroll"></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
