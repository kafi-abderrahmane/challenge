import axios from "axios";
import { ReservationType } from "@/types";
import { OptionsReservationType } from "@/types";
import { formatDate } from "@/utils";

interface fetchReservationsParams {
  page?: number;
  limit?: number;
  options?: OptionsReservationType;
}

interface fetchReservationsResponse {
  reservations: ReservationType[];
  total: number;
}

export const fetchReservations = async (
  variables?: fetchReservationsParams
): Promise<fetchReservationsResponse> => {
  try {
    const response = await axios.get(
      `https://66c37deed057009ee9c072de.mockapi.io/api/v1/reservations`,
      {
        params: {
          page: variables?.page,
          limit: variables?.limit,
          "customer[firstName]": variables?.options?.search,
          businessDate: variables?.options?.businessDate
            ? formatDate(variables?.options?.businessDate)
            : "",
          status: variables?.options?.status,
          shift: variables?.options?.shift,
          area: variables?.options?.area,
          sortBy: "",
        },
      }
    );
    const total = await getTotalReservations(variables);

    // I use getTotalReservations because I can't modify the mockapi.io response without paying
    return { reservations: response?.data, total: total };
  } catch (error) {
    throw error;
  }
};

export const getTotalReservations = async (
  variables?: fetchReservationsParams
): Promise<number> => {
  try {
    const response = await axios.get(
      `https://66c37deed057009ee9c072de.mockapi.io/api/v1/reservations`,
      {
        params: {
          "customer[firstName]": variables?.options?.search,
          businessDate: variables?.options?.businessDate
            ? formatDate(variables?.options?.businessDate)
            : "",
          status: variables?.options?.status,
          shift: variables?.options?.shift,
          area: variables?.options?.area,
        },
      }
    );
    if (!Number(response?.data?.length)) return 0;
    return response?.data?.length;
  } catch (error) {
    return 0;
  }
};
