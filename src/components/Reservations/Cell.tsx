"use client";
import React from "react";
import { ReservationType } from "@/types";

import { rgba } from "polished";

interface CellProps {
  item: ReservationType;
}

export const Cell: React.FC<CellProps> = ({ item }) => {
  const statusColor = status[item?.status?.toLowerCase()] || "#808080";
  return (
    <tr className="cursor-pointer sm:cursor-default flex flex-row w-full items-center justify-center min-h-[60px] font-normal text-[#808080] text-[10px] sm:text-sm border-b border-b-[#F2F2F2] duration-300 hover:bg-[#f1f1f1] group/item">
      <td className="flex-1 text-center break-words line-clamp-3 p-1">
        {item?.id}
      </td>
      <td className="flex-1 text-center break-words line-clamp-3 p-1">
        {item?.businessDate}
      </td>
      <td className="flex-1 flex items-center justify-center break-words p-1">
        <div
          className={`rounded-[4px] text-center text-[10px] sm:text-sm
              flex justify-center items-center p-[5px]`}
          style={{
            color: statusColor,
            backgroundColor: rgba(statusColor, 0.2),
          }}>
          <span className="line-clamp-2">{item?.status}</span>
        </div>
      </td>
      <td className="flex-1 text-center break-words line-clamp-3 p-1">
        {item?.shift}
      </td>
      <td className="flex-1 text-center break-words line-clamp-3 p-1">
        {item?.start?.split("T")[0]} {item?.start?.split("T")[1]?.slice(0, 5)}
      </td>
      <td className="flex-1 text-center break-words line-clamp-3 p-1">
        {item?.end?.split("T")[0]} {item?.end?.split("T")[1]?.slice(0, 5)}
      </td>
      <td className="flex-1 text-center break-words line-clamp-3 p-1">
        {item?.quantity}
      </td>
      <td className="flex-1 text-center break-words line-clamp-3 p-1">
        {item?.customer?.firstName} {item?.customer?.lastName}
      </td>
      <td className="flex-1 text-center break-words line-clamp-3 p-1">
        {item?.area}
      </td>
      <td className="flex-1 text-center break-words line-clamp-3 p-1">
        {item?.guestNotes || "--"}
      </td>
    </tr>
  );
};

const status: { [key: string]: string } = {
  confirmed: "#3b82f6",
  seated: "#22c55e",
  "checked out": "#000",
  "not confirmed": "red",
};

const shift: { [key: string]: string } = {
  breakfast: "",
  lunch: "",
  dinner: "",
};
