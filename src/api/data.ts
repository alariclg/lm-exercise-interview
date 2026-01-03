import DataExample from "@models/DataExample";
import { useQuery } from "@tanstack/react-query";
import { useSnapshot } from "valtio";

import userState from "@store/user";

export const useDataQuery = () => {
  const { token } = useSnapshot(userState);

  return useQuery<DataExample[], Error>({
    queryKey: ["fetchData"],
    queryFn: async (): Promise<DataExample[]> => {
      const response = await fetch(`/api/data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      return response.json();
    },
  });
};
