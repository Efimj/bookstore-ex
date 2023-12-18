import * as React from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import UserLibraryContent from "../../components/UserLibraryContent/UserLibraryContent";
import { observer } from "mobx-react-lite";
import userStore from "../../store/UserStore";

export interface ILibrary {}

export const LibraryPageRoute = "/library/:page";
export const NavigateLibraryPageRoute = (page: string): string =>
  `/library/${page}`;

const LibraryPage: React.FC = observer((props: ILibrary) => {
  if (!userStore.checkAuth()) return;
  if (userStore.user === null) throw "unauthorized";

  return (
    <PageWrapper>
      {/* <UserInformation user={user} /> */}
      <UserLibraryContent showCreateBook user={userStore.user} />
    </PageWrapper>
  );
});

export default LibraryPage;
