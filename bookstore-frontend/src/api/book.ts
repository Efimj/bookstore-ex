import axios, { AxiosResponse } from "axios";
import api from "./const";
import IUser from "../interfaces/IAuthor";
import IBookOffer from "../interfaces/IBookOffer";
import IBookDiscount from "../interfaces/IBookDiscount";
import IBookEvaluations from "../interfaces/IBookEvaluations";
import IBookReview from "../interfaces/IBookReview";
import IBookSate from "../interfaces/IBookSate";
import $api from "./axios";
import { IBookInformation } from "../interfaces/IBookInformation";
import { BookEditOfferFormValues } from "../components/BookEditMenu/BookEditOfferModal";
import { BookEditDiscountFormValues } from "../components/BookEditMenu/BookEditDiscountModal";

export async function getBooks(
  startFrom: number,
  limit: number
): Promise<IBookInformation[]> {
  const response: AxiosResponse<Array<IBookInformation>> = await axios.get(
    `${api.books}?start_from=${startFrom}&limit=${limit}`
  );
  return response.data;
}

export async function getBook(bookId: string): Promise<IBookInformation> {
  const response: AxiosResponse<IBookInformation> = await axios.get(
    `${api.book}?id=${bookId}`
  );
  return response.data;
}

export async function getBookState(bookId: string): Promise<IBookSate> {
  const response: AxiosResponse<IBookSate> = await $api.get(
    `${api.book_state}?id=${bookId}`
  );
  return response.data;
}

export async function getBookAuthors(bookId: string): Promise<IUser[]> {
  try {
    const response: AxiosResponse<Array<IUser>> = await axios.get(
      `${api.book_authors}?id=${bookId}`
    );
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getBookOffer(bookId: string): Promise<IBookOffer | null> {
  try {
    const response: AxiosResponse<IBookOffer> = await axios.get(
      `${api.book_offer}?id=${bookId}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function getBookDiscount(
  bookId: string
): Promise<IBookDiscount | null> {
  try {
    const response: AxiosResponse<IBookDiscount> = await axios.get(
      `${api.book_discount}?id=${bookId}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function getBookEvaluations(
  bookId: string
): Promise<IBookEvaluations> {
  const response: AxiosResponse<IBookEvaluations> = await axios.get(
    `${api.book_evaluations}?id=${bookId}`
  );
  return response.data;
}

export async function getBookReviews(
  bookId: string,
  startFrom: number,
  limit: number
): Promise<IBookReview[]> {
  const response: AxiosResponse<IBookReview[]> = await axios.get(
    `${api.book_reviews}?id=${bookId}&start_from=${startFrom}&limit=${limit}`
  );
  return response.data;
}

export async function getAuthorsByEmail(
  email: string,
  startFrom: number,
  limit: number
): Promise<IUser[]> {
  const response: AxiosResponse<IUser[]> = await axios.get(
    `${api.authors_by_email}?email=${email}&start_from=${startFrom}&limit=${limit}`
  );
  return response.data;
}

export interface PublishBookData {
  title: string;
  description: string;
  image: File;
  pages: number;
  authors: number[];
  ageRestrictions: number;
  publicationDate: Date;
}

export function createFormData(bookData: PublishBookData): FormData {
  const formData = new FormData();
  formData.append("title", bookData.title);
  formData.append("description", bookData.description);
  formData.append("image", bookData.image);
  formData.append("pages", bookData.pages.toString());

  formData.append(`authors`, JSON.stringify(bookData.authors));

  formData.append("ageRestrictions", bookData.ageRestrictions.toString());

  const dateString = bookData.publicationDate.toISOString();
  formData.append("publicationDate", dateString);

  return formData;
}

export async function postPublishBook(data: PublishBookData): Promise<string> {
  const response: AxiosResponse<string> = await $api.post(
    `${api.publish_book}`,
    createFormData(data),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function postUpdateBook(
  bookId: number,
  data: PublishBookData
): Promise<string> {
  let formData = createFormData(data);
  formData.append("book_id", bookId.toString());
  const response: AxiosResponse<string> = await $api.post(
    `${api.update_book}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function postUpdateBookOffer(
  book_id: number,
  data: BookEditOfferFormValues
): Promise<string> {
  const formData = new FormData();
  formData.append("book_id", book_id.toString());
  formData.append("price", data.price.toString());

  const response: AxiosResponse<string> = await $api.post(
    `${api.edit_book_offer}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function postUpdateBookDiscount(
  book_id: number,
  data: BookEditDiscountFormValues
): Promise<string> {
  const formData = new FormData();
  formData.append("book_id", book_id.toString());
  formData.append("price", data.price.toString());
  const dateString = data.expirationDate.toISOString();
  formData.append("expiration_date", dateString);

  const response: AxiosResponse<string> = await $api.post(
    `${api.edit_book_discount}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function getDeleteBookDiscount(bookId: number): Promise<boolean> {
  const response: AxiosResponse<boolean> = await $api.get(
    `${api.delete_book_discount}?id=${bookId}`
  );
  return response.data;
}
