import PageWrapper from "../../components/PageWrapper/PageWrapper";
import EditPasswordForm from "./EditPasswordForm";
import EditProfileFormContent from "./EditProfileForm";
import { Box } from "@mui/material";

export const AccountSettingsPageRoute = "/account/settings";
export const NavigateAccountSettingsPageRoute = (): string =>
  `/account/settings`;

export interface ISettings {}

export default function SettingsPage(props: ISettings) {
  return (
    <PageWrapper>
      <EditProfileFormContent onUpdate={() => {}} />
      <Box sx={{ marginTop: "1rem" }}></Box>
      <EditPasswordForm onUpdate={() => {}} />
      <Box sx={{ marginTop: "15rem" }}></Box>
    </PageWrapper>
  );
}
