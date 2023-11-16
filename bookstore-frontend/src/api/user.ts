import axios, { AxiosResponse } from "axios";
import api from "./const";
import IUser from "../interfaces/IAuthor";
import IBook from "../interfaces/IBook";

export async function getUser(userId: string): Promise<IUser> {
  const response: AxiosResponse<IUser> = await axios.get(
    `${api.user}?id=${userId}`
  );
  return response.data;
}

export async function getUserWishlist(
  userId: string,
  startFrom: number,
  limit: number
): Promise<IBook[]> {
  const response: AxiosResponse<IBook[]> = await axios.get(
    `${api.user_wishes}?id=${userId}&start_from=${startFrom}&limit=${limit}`
  );
  return response.data;
}

export async function getUserLibrary(
  userId: string,
  startFrom: number,
  limit: number
): Promise<IBook[]> {
  const response: AxiosResponse<IBook[]> = await axios.get(
    `${api.user_library}?id=${userId}&start_from=${startFrom}&limit=${limit}`
  );
  return response.data;
}

export async function getUserPublish(
  userId: string,
  startFrom: number,
  limit: number
): Promise<IBook[]> {
  const response: AxiosResponse<IBook[]> = await axios.get(
    `${api.user_publish}?id=${userId}&start_from=${startFrom}&limit=${limit}`
  );
  return response.data;
}
