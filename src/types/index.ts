export type StatusType =
  | "CONFIRMED"
  | "SEATED"
  | "CHECKED OUT"
  | "NOT CONFIRMED";
export type ShiftType = "BREAKFAST" | "LUNCH" | "DINNER";
export type AreaType = "MAIN ROOM" | "BAR";

export interface Customer {
  firstName: string;
  lastName: string;
}
export interface ReservationType {
  id: number;
  businessDate: string;
  status: StatusType;
  shift: ShiftType;
  start: string;
  end: string;
  quantity: 1;
  customer: Customer;
  area: AreaType;
  guestNotes: string;
}

export interface OptionsReservationType {
  search?: string;
  businessDate?: string;
  status?: StatusType | "";
  shift?: ShiftType | "";
  area?: AreaType | "";
  sortBy?: string;
}
