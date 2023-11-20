import { Label, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  useTheme,
  Divider,
  Paper,
  FormControl,
  Box,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Button,
  ButtonGroup,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC, useState } from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoginIcon from "@mui/icons-material/Login";

export interface IRegistrationForm {
  isOpened: boolean;
  onDismiss: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
}

const RegistrationForm: FC<IRegistrationForm> = ({
  isOpened,
  onDismiss,
  onSignIn = () => {},
  onSignUp = () => {},
}) => {
  const theme = useTheme();
  const [selectedBtn, setSelectedBtn] = useState("registration");
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    onDismiss();
  };

  const handleSignIn = () => {
    onSignIn();
  };
  const handleSignUp = () => {
    onSignUp();
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
          <FormGroup
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Box sx={{ display: "flex", gap: "1.5rem" }}>
              <FormControl defaultValue="" fullWidth required>
                <TextField label="First name" variant="standard" />
              </FormControl>
              <FormControl defaultValue="" fullWidth required>
                <TextField label="Last name" variant="standard" />
              </FormControl>
            </Box>
            <FormControl defaultValue="" required>
              <TextField
                sx={{ mt: "1rem" }}
                variant="standard"
                name="Email"
                placeholder="Eg. recipient@email.com"
                type="email"
              />
            </FormControl>
            <Box sx={{ display: "flex", gap: "1.5rem" }}>
              <FormControl variant="standard" required>
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        onMouseDown={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {
                          event.preventDefault();
                        }}
                        sx={{ opacity: ".5" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="standard" required>
                <InputLabel htmlFor="standard-adornment-password">
                  Repeat password
                </InputLabel>
                <Input
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        onMouseDown={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {
                          event.preventDefault();
                        }}
                        sx={{ opacity: ".5" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Birthday"
                sx={{ mt: "1rem", ".MuiIconButton-root": { opacity: ".5" } }}
              />
            </LocalizationProvider>
            <FormControlLabel
              sx={{ opacity: ".5" }}
              control={<Checkbox />}
              label="Publisher account"
            />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{ borderRadius: ".5rem" }}
                size="large"
                variant={
                  selectedBtn === "registration" ? "contained" : "outlined"
                }
                onClick={handleSignUp}
                startIcon={<CheckCircleIcon></CheckCircleIcon>}
              >
                Sign un
              </Button>
            </Box>
          </FormGroup>
        </DialogContent>
      </Paper>
    </Dialog>
  );
};

export default RegistrationForm;
