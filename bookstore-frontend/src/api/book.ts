import axios, { AxiosResponse } from "axios";
import api from "./const";
import IBook from "../interfaces/IBook";

export async function getBooks(): Promise<IBook[]> {
  const response: AxiosResponse<Array<IBook>> = await axios.get(`${api.books}`);
  return response.data;
}

export async function getBook(bookId: string): Promise<IBook> {
  const response: AxiosResponse<IBook> = await axios.get(`${api.book}?id=${bookId}`);
  return response.data;
}
