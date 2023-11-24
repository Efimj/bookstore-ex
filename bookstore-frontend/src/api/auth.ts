import axios, { AxiosResponse } from "axios";
import api from "./const";
import $api from "./axios";
import IUser from "../interfaces/IAuthor";

export async function logIn(
  email: string,
  password: string,
  remember: boolean = false
): Promise<boolean> {
  const response: AxiosResponse = await axios.post(
    api.login,
    {
      email: email,
      password: password,
      remember: remember,
    },
    { withCredentials: true }
  );

  console.log(response.data)

  if (response.data?.access_token) {
    localStorage.access_token = response.data.access_token;
    return true;
  }

  return false;
}

export async function logOut(): Promise<boolean> {
  const response: AxiosResponse = await $api.post(
    api.logout,
    { withCredentials: true }
  );
 return true
}

export async function me(): Promise<IUser> {
  const response: AxiosResponse = await $api.post(
    api.me,
    { withCredentials: true }
  );
 return response.data
}