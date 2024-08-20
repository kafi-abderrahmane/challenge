"use client";
import React from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import {
  OptionsReservationType,
  StatusType,
  ShiftType,
  AreaType,
} from "@/types";

interface ReservationFilterProps {
  options: OptionsReservationType;
  setOptions: React.Dispatch<React.SetStateAction<OptionsReservationType>>;
}

const ReservationFilter: React.FC<ReservationFilterProps> = ({
  options,
  setOptions,
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prev: OptionsReservationType) => ({
      ...prev,
      search: e.target.value,
    }));
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prev: OptionsReservationType) => ({
      ...prev,
      businessDate: e.target.value,
      showAll: false,
    }));
  };

  const handleStatus = (e: SelectChangeEvent) => {
    setOptions((prev: OptionsReservationType) => ({
      ...prev,
      status: e?.target?.value as StatusType,
    }));
  };

  const handleShift = (e: SelectChangeEvent) => {
    setOptions((prev: OptionsReservationType) => ({
      ...prev,
      shift: e?.target?.value as ShiftType,
    }));
  };

  const handleArea = (e: SelectChangeEvent) => {
    setOptions((prev: OptionsReservationType) => ({
      ...prev,
      area: e?.target?.value as AreaType,
    }));
  };

  const handleSort = (e: SelectChangeEvent) => {
    setOptions((prev: OptionsReservationType) => ({
      ...prev,
      sortBy: e?.target?.value as string,
    }));
  };

  const handleShowAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prev: OptionsReservationType) => ({
      ...prev,
      showAll: event.target.checked,
      businessDate: "",
    }));
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <TextField
        id="search"
        value={options?.search}
        onChange={handleSearch}
        size="small"
        label="Search"
      />
      <TextField
        id="datepicker"
        type="date"
        size="small"
        value={options?.businessDate}
        onChange={handleDate}
      />

      <FormControl fullWidth>
        <InputLabel id="status-select-label" size="small">
          Status
        </InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          size="small"
          value={options?.status}
          label="Status"
          onChange={handleStatus}>
          <MenuItem value={""}>ALL</MenuItem>
          <MenuItem value={"CONFIRMED"}>CONFIRMED</MenuItem>
          <MenuItem value={"SEATED"}>SEATED</MenuItem>
          <MenuItem value={"CHECKED OUT"}>CHECKED OUT</MenuItem>
          <MenuItem value={"NOT CONFIRMED"}>NOT CONFIRMED</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="shift-select-label" size="small">
          Shift
        </InputLabel>
        <Select
          labelId="shift-select-label"
          id="shift-select"
          size="small"
          value={options?.shift}
          label="Shift"
          onChange={handleShift}>
          <MenuItem value={""}>ALL</MenuItem>
          <MenuItem value={"BREAKFAST"}>BREAKFAST</MenuItem>
          <MenuItem value={"LUNCH"}>LUNCH</MenuItem>
          <MenuItem value={"DINNER"}>DINNER</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="area-select-label" size="small">
          Area
        </InputLabel>
        <Select
          labelId="area-select-label"
          id="area-select"
          size="small"
          value={options?.area}
          label="Area"
          onChange={handleArea}>
          <MenuItem value={""}>ALL</MenuItem>
          <MenuItem value={"MAIN ROOM"}>MAIN ROOM</MenuItem>
          <MenuItem value={"BAR"}>BAR</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="sort-select-label" size="small">
          Sort by
        </InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          size="small"
          value={options?.sortBy}
          label="Sort by"
          onChange={handleSort}>
          <MenuItem value={"id"}>Guest number</MenuItem>
          <MenuItem value={"name"}>Guest name</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox checked={options?.showAll} onChange={handleShowAll} />
        }
        label="Show All"
      />
    </div>
  );
};

export default ReservationFilter;
