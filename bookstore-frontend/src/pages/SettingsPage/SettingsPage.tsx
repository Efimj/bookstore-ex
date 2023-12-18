import * as React from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import RegistrationFormContent from "../../components/AuthorizationForm/RegistrationFormContent";
import EditProfileFormContent from "./EditProfileForm";

export const AccountSettingsPageRoute = "/account/settings";
export const NavigateAccountSettingsPageRoute = (): string =>
  `/account/settings`;

export interface ISettings {}

export default function SettingsPage(props: ISettings) {
  return (
    <PageWrapper>
      <EditProfileFormContent onUpdate={() => {}} />
    </PageWrapper>
  );
}
