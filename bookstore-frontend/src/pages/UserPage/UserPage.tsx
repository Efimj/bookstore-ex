import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IUser from "../../interfaces/IAuthor";
import { getUser } from "../../api/user";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

import UserLibraryContent from "../../components/UserLibraryContent/UserLibraryContent";
import UserInformation from "../../components/UserInformation/UserInformation";

export interface IUserPage {}

export const UserPageRoute = "/user/:userId";
export const NavigateUserPageRoute = (userId: string):string => `/user/${userId}`;

const UserPage: FC<IUserPage> = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    async function get() {
      if (!userId) return;
      let response = await getUser(userId);
      if (response !== null) setUser(response);
    }
    get();
  }, []);

  if (user === null) return;

  return (
    <PageWrapper>
      <UserInformation user={user} />
      <UserLibraryContent user={user} />
    </PageWrapper>
  );
};

export default UserPage;
