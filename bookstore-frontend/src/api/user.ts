import axios, { AxiosResponse } from "axios";
import api from "./const";
import IUser from "../interfaces/IAuthor";

export async function getUser(userId: string): Promise<IUser> {
    const response: AxiosResponse<IUser> = await axios.get(
      `${api.user}?id=${userId}`
    );
    return response.data;
  }