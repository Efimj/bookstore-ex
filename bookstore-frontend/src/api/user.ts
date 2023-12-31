import axios, { AxiosResponse } from "axios";
import api from "./const";
import IUser from "../interfaces/IAuthor";
import $api from "./axios";
import { IBookInformation } from "../interfaces/IBookInformation";
import ICheck from "../interfaces/ICheck";
import { RegistrationFormValues } from "../components/AuthorizationForm/RegistrationFormContent";
import { EditProfileFormValues } from "../pages/SettingsPage/EditProfileForm";
import dayjs from "dayjs";
import { EditPasswordFormValues } from "../pages/SettingsPage/EditPasswordForm";

export async function getUser(userId: string): Promise<IUser> {
  const response: AxiosResponse<IUser> = await axios.get(
    `${api.user}?id=${userId}`
  );
  return response.data;
}

export async function purchaseBook(bookId: string): Promise<ICheck> {
  const response: AxiosResponse<ICheck> = await $api.get(
    `${api.purchase_book}?id=${bookId}`
  );
  return response.data;
}

export async function getUserWishlist(
  userId: string,
  startFrom: number,
  limit: number
): Promise<IBookInformation[]> {
  const response: AxiosResponse<IBookInformation[]> = await axios.get(
    `${api.user_wishes}?id=${userId}&start_from=${startFrom}&limit=${limit}`
  );
  return response.data;
}

export async function getUserLibrary(
  userId: string,
  startFrom: number,
  limit: number
): Promise<IBookInformation[]> {
  const response: AxiosResponse<IBookInformation[]> = await axios.get(
    `${api.user_library}?id=${userId}&start_from=${startFrom}&limit=${limit}`
  );
  return response.data;
}

export async function getUserPublish(
  userId: string,
  startFrom: number,
  limit: number
): Promise<IBookInformation[]> {
  const response: AxiosResponse<IBookInformation[]> = await axios.get(
    `${api.user_publish}?id=${userId}&start_from=${startFrom}&limit=${limit}`
  );
  return response.data;
}

export async function getAccount(): Promise<IUser> {
  const response: AxiosResponse<IUser> = await $api.get(api.account);
  return response.data;
}

export function createRegistrationFormData(
  value: RegistrationFormValues
): FormData {
  const formData = new FormData();
  formData.append("firstName", value.firstName);
  formData.append("lastName", value.lastName);
  formData.append("isPublisher", JSON.stringify(value.isPublisher));
  formData.append("password", value.password);
  formData.append(`email`, value.email);
  const dateString = value.birthday.toISOString();
  formData.append("birthday", dateString);

  return formData;
}

export async function postAccountRegistration(
  value: RegistrationFormValues
): Promise<IUser> {
  const response: AxiosResponse<IUser> = await axios.post(
    api.registration,
    createRegistrationFormData(value),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export interface EditProfileData {
  image: File;
  firstName: string;
  lastName: string;
  birthday: dayjs.Dayjs;
}

export async function postUpdateAccountData(
  value: EditProfileData
): Promise<IUser> {
  const formData = new FormData();
  formData.append("firstName", value.firstName);
  formData.append("lastName", value.lastName);
  const dateString = value.birthday.toISOString();
  formData.append("birthday", dateString);
  formData.append("image", value.image);

  const response: AxiosResponse<IUser> = await $api.post(
    api.update_account_data,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function postUpdateAccountPassword(
  value: EditPasswordFormValues
): Promise<IUser> {
  const formData = new FormData();
  formData.append("oldPassword", value.oldPassword);
  formData.append("newPassword", value.newPassword);

  const response: AxiosResponse<IUser> = await $api.post(
    api.update_account_password,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
