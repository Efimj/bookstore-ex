import {
  Dialog,
  DialogTitle,
  DialogContent,
  useTheme,
  Divider,
  Paper,
  Button,
  ButtonGroup,
} from "@mui/material";
import { FC, useState } from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LoginIcon from "@mui/icons-material/Login";
import RegistrationFormContent from "./RegistrationFormContent";
import AuthorizationFormContent from "./AuthorizationFormContent";

export interface IAuthorizationForm {
  isOpened: boolean;
  onDismiss: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
}

const AuthorizationForm: FC<IAuthorizationForm> = ({
  isOpened,
  onDismiss,
  onSignIn = () => {},
  onSignUp = () => {},
}) => {
  const theme = useTheme();
  const [selectedBtn, setSelectedBtn] = useState("authorization");

  const handleClose = () => {
    onDismiss();
  };

  const handleSignIn = () => {
    onSignIn();
  };
  const handleSignUp = () => {
    onSignUp();
    setSelectedBtn("authorization");
  };

  return (
    <Dialog
      open={isOpened}
      onClose={handleClose}
      sx={{
        backdropFilter: "blur(5px) sepia(5%)",
      }}
      PaperProps={{
        sx: {
          margin: "1rem",
          borderRadius: "1rem",
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <Paper>
        <DialogTitle>
          <ButtonGroup
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
            }}
            disableElevation
            variant="outlined"
            color="primary"
          >
            <Button
              sx={{ borderRadius: ".5rem", width: "100%", height: "100%" }}
              size="large"
              variant={
                selectedBtn === "authorization" ? "contained" : "outlined"
              }
              onClick={() => setSelectedBtn("authorization")}
              startIcon={<LoginIcon></LoginIcon>}
            >
              Authorization
            </Button>
            <Button
              sx={{ borderRadius: ".5rem", width: "100%", height: "100%" }}
              size="large"
              variant={
                selectedBtn === "registration" ? "contained" : "outlined"
              }
              onClick={() => setSelectedBtn("registration")}
              startIcon={<AssignmentIndIcon></AssignmentIndIcon>}
            >
              Registration
            </Button>
          </ButtonGroup>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {selectedBtn === "authorization" && (
            <AuthorizationFormContent onSignIn={handleSignIn} />
          )}
          {selectedBtn === "registration" && (
            <RegistrationFormContent onSignUp={handleSignUp} />
          )}
        </DialogContent>
      </Paper>
    </Dialog>
  );
};

export default AuthorizationForm;
