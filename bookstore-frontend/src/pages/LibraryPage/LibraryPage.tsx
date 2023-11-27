import * as React from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import UserInformation from "../../components/UserInformation/UserInformation";
import UserLibraryContent from "../../components/UserLibraryContent/UserLibraryContent";
import IUser from "../../interfaces/IAuthor";
import { me } from "../../api/auth";

export interface ILibrary {}

export default function LibraryPage(props: ILibrary) {

  const [user, setUser] = React.useState<IUser | null>(null);

  React.useEffect(() => {
    async function get() {
      let response = await me();
      if (response !== null) setUser(response);
    }
    get();
  }, []);

  if (user === null) return;

  return (
    <PageWrapper>
      {/* <UserInformation user={user} /> */}
      <UserLibraryContent user={user} />
    </PageWrapper>
  );
}
