import axios, { AxiosResponse } from "axios";
import api from "./const";
import IBook from "../interfaces/IBook";
import IUser from "../interfaces/IAuthor";
import IBookOffer from "../interfaces/IBookOffer";
import IBookDiscount from "../interfaces/IBookDiscount";
import IBookEvaluations from "../interfaces/IBookEvaluations";

export async function getBooks(): Promise<IBook[]> {
  const response: AxiosResponse<Array<IBook>> = await axios.get(`${api.books}`);
  return response.data;
}

export async function getBook(bookId: string): Promise<IBook> {
  const response: AxiosResponse<IBook> = await axios.get(
    `${api.book}?id=${bookId}`
  );
  return response.data;
}

export async function getBookAuthors(bookId: string): Promise<IUser[]> {
  const response: AxiosResponse<Array<IUser>> = await axios.get(
    `${api.book_authors}?id=${bookId}`
  );
  return response.data;
}

export async function getBookOffer(bookId: string): Promise<IBookOffer> {
  const response: AxiosResponse<IBookOffer> = await axios.get(
    `${api.book_offer}?id=${bookId}`
  );
  return response.data;
}

export async function getBookDiscount(bookId: string): Promise<IBookDiscount> {
  const response: AxiosResponse<IBookDiscount> = await axios.get(
    `${api.book_discount}?id=${bookId}`
  );
  return response.data;
}

export async function getBookEvaluations(bookId: string): Promise<IBookEvaluations> {
  const response: AxiosResponse<IBookEvaluations> = await axios.get(
    `${api.book_evaluations}?id=${bookId}`
  );
  return response.data;
}
