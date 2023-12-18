import { FC } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import UserInformation from "../../components/UserInformation/UserInformation";
import userStore from "../../store/UserStore";
import { observer } from "mobx-react-lite";
import { useTheme } from "@mui/material";
import { NavigateAccountSettingsPageRoute } from "../SettingsPage/SettingsPage";
import { useNavigate } from "react-router-dom";

export interface IAccountPage {}

export const AccountPageRoute = "/account";
export const NavigateAccountPageRoute = (): string => `/account`;

const AccountPage: FC<IAccountPage> = observer(() => {
  const theme = useTheme();
  const navigate = useNavigate();
  if (!userStore.checkAuth()) return;
  if (userStore.user === null) throw "unauthorized";

  return (
    <PageWrapper>
      <UserInformation
        user={userStore.user}
        onEditClick={() => {
          let route = NavigateAccountSettingsPageRoute();
          console.log();
          navigate(route);
        }}
      />
    </PageWrapper>
  );
});

export default AccountPage;
