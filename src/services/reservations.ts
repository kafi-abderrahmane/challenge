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
          // "customer[firstName]": variables?.options?.search,
          businessDate: variables?.options?.businessDate
            ? formatDate(variables?.options?.businessDate)
            : "",
          status: variables?.options?.status,
          shift: variables?.options?.shift,
          area: variables?.options?.area,
          sortBy: variables?.options?.sortBy,
        },
      }
    );
    const newData = await additionalFiltering(
      variables?.options || {},
      response?.data
    );
    const total = await getTotalReservations(variables);

    // I use getTotalReservations because I can't modify the mockapi.io response without paying
    return { reservations: newData, total: total };
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
          // "customer[firstName]": variables?.options?.search,
          businessDate: variables?.options?.businessDate
            ? formatDate(variables?.options?.businessDate)
            : "",
          status: variables?.options?.status,
          shift: variables?.options?.shift,
          area: variables?.options?.area,
        },
      }
    );
    const newData = await additionalFiltering(
      variables?.options || {},
      response?.data
    );
    if (!Number(newData?.length)) return 0;
    return newData?.length;
  } catch (error) {
    return 0;
  }
};

const additionalFiltering = async (
  options: OptionsReservationType,
  data: ReservationType[]
): Promise<ReservationType[]> => {
  try {
    if (
      !options?.search &&
      !options?.status &&
      options?.sortBy !== "name" &&
      options?.businessDate
    ) {
      return data;
    }
    let newData: any[] = data;

    if (!options?.businessDate && !options?.showAll) {
      const today = new Date();
      newData = newData?.filter((item: ReservationType) => {
        const startDate = new Date(item.start);
        return startDate < today ? false : true;
      });
    }
    if (options?.search) {
      newData = newData?.filter(
        (item: ReservationType) =>
          item?.customer?.firstName
            ?.toLocaleLowerCase()
            ?.includes(options?.search?.toLocaleLowerCase() as string) ||
          item?.customer?.lastName
            ?.toLocaleLowerCase()
            ?.includes(options?.search?.toLocaleLowerCase() as string)
      );
    }
    if (options?.status) {
      newData = newData?.filter(
        (item: ReservationType) =>
          item?.status?.toLocaleLowerCase() ===
          options?.status?.toLocaleLowerCase()
      );
    }

    if (options?.sortBy === "name") {
      newData = newData?.sort((a, b) => {
        const firstNameA = a.customer.firstName.toUpperCase();
        const firstNameB = b.customer.firstName.toUpperCase();
        if (firstNameA < firstNameB) return -1;
        if (firstNameA > firstNameB) return 1;
        return 0;
      });
    }

    return newData;
  } catch (error) {
    return data;
  }
};
