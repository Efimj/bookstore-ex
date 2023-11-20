import { FC, useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

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
      <RegistrationForm
        isOpened={openLogInForm}
        onDismiss={() => {
          history.back()
        }}
        onSignIn={() => {
          setOpenLogInForm(false);
        }}
        onSignUp={() => {
          setOpenLogInForm(false);
        }}
      ></RegistrationForm>
    </PageWrapper>
  );
};

export default AccountPage;
