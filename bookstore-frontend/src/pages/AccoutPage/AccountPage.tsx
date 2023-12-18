import { FC, useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

export interface IAccountPage {}

export const AccountPageRoute = "/account";
export const NavigateAccountPageRoute = ():string => `/account`;

const AccountPage: FC<IAccountPage> = () => {
  const [openLogInForm, setOpenLogInForm] = useState(false);

  useEffect(() => {
    if (true) {
      setOpenLogInForm(true);
    }
  }, []);

  return (
    <PageWrapper>
      {/* <AuthorizationForm
        isOpened={openLogInForm}
        onDismiss={() => {
          history.back();
        }}
        onSignIn={() => {
          setOpenLogInForm(false);
        }}
        onSignUp={() => {
          setOpenLogInForm(false);
        }}
      ></AuthorizationForm> */}
    </PageWrapper>
  );
};

export default AccountPage;
