import AxiosIntance from "../../../api/axios";

export type FleetData = {
  patent: string;
  type: "chassis" | "trailer" | "";
};

export const createFleet = async (data: FleetData) => {
  await AxiosIntance.post("/fleet", data);
};

export const allFleets = async () => {
  return await AxiosIntance.get("/fleet");
};
