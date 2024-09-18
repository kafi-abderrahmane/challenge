"use client";
import React, { useState, useEffect } from "react";

import ReservationsTable from "@/components/Reservations/Table";
import FilterReservation from "@/components/Reservations/Filter";
import Pagination from "@mui/material/Pagination";

import { useQuery } from "@tanstack/react-query";
import { fetchReservations } from "@/services/reservations";

import { OptionsReservationType } from "@/types";

export default function HomeContent({ params }: any) {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [options, setOptions] = useState<OptionsReservationType>({
    search: "",
    businessDate: "",
    status: "",
    shift: "",
    area: "",
    sortBy: "id",
    showAll: false,
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["reservations", currentPage, pageSize, options],
    queryFn: () =>
      fetchReservations({ page: currentPage, limit: pageSize, options }),
  });
  const pages = typeof data?.total === "number" ? data?.total / pageSize : 0;

  useEffect(() => {
    if (currentPage !== 1) setCurrentPage(1);
  }, [options]);

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 w-full">
      <FilterReservation options={options} setOptions={setOptions} />
      <ReservationsTable data={data} error={error} loading={isLoading} />
      <div className="w-full flex items-end justify-end">
        <Pagination count={pages} page={currentPage} onChange={handleChange} />
      </div>
    </div>
  );
}
