import axios, { AxiosResponse } from "axios";
import api from "./const";
import IAgeRestrictions from "../interfaces/IAgeRestrictions";

export async function getAllAgeRestrictions(): Promise<IAgeRestrictions[]> {
  const response: AxiosResponse<IAgeRestrictions[]> = await axios.get(
    `${api.allAgeRestrictions}`
  );
  return response.data;
}
