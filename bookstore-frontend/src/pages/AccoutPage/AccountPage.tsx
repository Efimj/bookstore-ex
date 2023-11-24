import { FC, useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AuthorizationForm from "../../components/AuthorizationForm/AuthorizationForm";

export interface IAccountPage {}

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
