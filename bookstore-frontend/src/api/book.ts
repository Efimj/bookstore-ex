import axios, { AxiosResponse } from "axios";
import api from "./const";
import IBook from "../interfaces/IBook";

export async function getBooks(): Promise<IBook[]> {
  const response: AxiosResponse<Array<IBook>> = await axios.get(`${api.books}`);
  return response.data;
}
