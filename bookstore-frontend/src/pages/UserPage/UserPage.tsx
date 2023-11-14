import { Box } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IUser from "../../interfaces/IAuthor";
import IBook from "../../interfaces/IBook";
import { getUser } from "../../api/user";

export interface IUserPage {}

const UserPage: FC<IUserPage> = () => {
  const { userId } = useParams();
  const [book, setBook] = useState<IBook | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    async function get() {
      if (!userId) return;
      let response = await getUser(userId);
      if (response !== null) setUser(response);
    }
    get();
  }, []);

  console.log(user)

  return <Box>{user?.email}</Box>;
};

export default UserPage;
