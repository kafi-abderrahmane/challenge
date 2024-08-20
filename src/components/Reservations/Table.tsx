"use client";
import React from "react";

import SkeletonTable from "./common/SkeletonTable";
import { Cell } from "./Cell";

import { ReservationType } from "@/types";

interface ReservationsTableProps {
  loading: boolean;
  error?: any;
  data: any;
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({
  loading,
  error,
  data,
}) => {
  return (
    <div className="w-full flex items-start justify-center min-h-[700px]">
      {loading ? (
        <div className="w-full">
          <SkeletonTable />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full ">
          <div className="flex flex-col items-center justify-center w-full my-5">
            <div className="w-full overflow-auto">
              <table className="w-full min-w-[1020px]">
                <thead>
                  <tr className="flex flex-row w-full items-center justify-center py-4 border-b border-primary text-primary text-[10px] sm:text-sm font-semibold">
                    <th className="flex-1">Reservation ID</th>
                    <th className="flex-1">Business Date</th>
                    <th className="flex-1">Status</th>
                    <th className="flex-1">Shift</th>
                    <th className="flex-1">Start</th>
                    <th className="flex-1">End</th>
                    <th className="flex-1">Quantity</th>
                    <th className="flex-1">Customer</th>
                    <th className="flex-1">Area</th>
                    <th className="flex-1">Quest Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data?.reservations?.map(
                      (item: ReservationType, index: number) => (
                        <Cell key={index} item={item} />
                      )
                    )}
                </tbody>
              </table>
              {(!data || data?.reservations?.length === 0) && (
                <div className="text-[#808080] h-[100px] text-base flex flex-row w-full items-center justify-center ">
                  No data
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationsTable;
