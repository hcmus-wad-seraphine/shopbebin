import { OrderStatus } from "@prisma/client";
import { useEffect, useState } from "react";

interface StatusProps {
  status: OrderStatus;
}

const Status = ({ status }: StatusProps) => {
  const [state, setState] = useState<number>(0);
  useEffect(() => {
    switch (status) {
      case OrderStatus.ORDERED:
        setState(0);
        break;
      case OrderStatus.PREPARING:
        setState(1);
        break;
      case OrderStatus.DELIVERING:
        setState(2);
        break;
      case OrderStatus.DELIVERED:
        setState(3);
        break;
      case OrderStatus.REVIEWED:
        setState(4);
        break;
      case OrderStatus.CANCELLED:
        setState(5);
        break;
      default:
        setState(5);
        break;
    }
  }, []);

  if (state === 5)
    return (
      <div>
        <div className="flex-col items-center">
          <div
            className={`rounded-full w-20 h-20 border-4 border-error justify-center items-center`}
          >
            <i className={`fa-solid fa-clipboard-list text-2xl text-error`}></i>
          </div>
          <p>Ordered</p>
        </div>

        <div className="bg-error flex-1 h-[4px] mt-10"></div>

        <div className="flex-col items-center">
          <div
            className={`rounded-full w-20 h-20 border-4 border-error justify-center items-center`}
          >
            <i className={`fa-solid fa-xmark text-2xl text-error`}></i>
          </div>
          <p>Cancelled</p>
        </div>
      </div>
    );

  return (
    <div>
      <div className="flex-col items-center">
        <div
          className={`rounded-full w-20 h-20 border-4 border-primary justify-center items-center`}
        >
          <i
            className={`fa-solid fa-clipboard-list text-2xl text-primary
`}
          ></i>
        </div>
        <p>Ordered</p>
      </div>

      <div className={`bg-${state < 1 ? "gray-500" : "primary"} flex-1 h-[4px] mt-10`}></div>

      <div className="flex-col items-center">
        <div
          className={`rounded-full w-20 h-20 border-4 border-${
            state < 1 ? "gray-500" : "primary"
          } justify-center items-center`}
        >
          <i
            className={`fa-solid fa-hourglass-half text-2xl text-${
              state < 1 ? "gray-500" : "primary"
            }`}
          ></i>
        </div>
        <p>Preparing</p>
      </div>

      <div className={`bg-${state < 2 ? "gray-500" : "primary"} flex-1 h-[4px] mt-10`}></div>

      <div className="flex-col items-center">
        <div
          className={`rounded-full w-20 h-20 border-4 border-${
            state < 2 ? "gray-500" : "primary"
          } justify-center items-center`}
        >
          <i
            className={`fa-solid fa-truck text-2xl text-${state < 2 ? "gray-500" : "primary"}`}
          ></i>
        </div>
        <p>Delivering</p>
      </div>

      <div className={`bg-${state < 3 ? "gray-500" : "primary"} flex-1 h-[4px] mt-10`}></div>

      <div className="flex-col items-center">
        <div
          className={`rounded-full w-20 h-20 border-4 border-${
            state < 3 ? "gray-500" : "primary"
          } justify-center items-center`}
        >
          <i
            className={`fa-solid fa-square-check text-2xl text-${
              state < 3 ? "gray-500" : "primary"
            }`}
          ></i>
        </div>

        <p>Delivered</p>
      </div>

      <div className={`bg-${state < 4 ? "gray-500" : "primary"} flex-1 h-[4px] mt-10`}></div>

      <div className="flex-col items-center">
        <div
          className={`rounded-full w-20 h-20 border-4 border-${
            state < 4 ? "gray-500" : "primary"
          } justify-center items-center`}
        >
          <i
            className={`fa-solid fa-pencil text-2xl text-${state < 4 ? "gray-500" : "primary"}`}
          ></i>
        </div>
        <p>Review</p>
      </div>
    </div>
  );
};

export default Status;
