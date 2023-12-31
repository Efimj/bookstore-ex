import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  FormControl,
  Box,
  FormControlLabel,
  Checkbox,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Button,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { postAccountRegistration } from "../../api/user";
import { enqueueSnackbar } from "notistack";

export interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  birthday: dayjs.Dayjs;
  isPublisher: boolean;
  password: string;
  repeatPassword: string;
  email: string;
}

const defaultFormValues: RegistrationFormValues = {
  firstName: "",
  lastName: "",
  birthday: dayjs(Date.now()).subtract(14, "year"),
  isPublisher: false,
  password: "",
  repeatPassword: "",
  email: "",
};

const minFirstNameLength = 2;
const maxFirstNameLength = 50;
const minLastNameLength = 2;
const maxLastNameLength = 50;
const minPasswordLength = 8;
const maxPasswordLength = 50;

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(minFirstNameLength, "Too Short!")
    .max(maxFirstNameLength, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(minLastNameLength, "Too Short!")
    .max(maxLastNameLength, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .required("Password is required")
    .min(minPasswordLength, "Password must be at least 8 characters")
    .matches(
      /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
      "Password must meet the criteria"
    ),
  repeatPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  email: Yup.string().email("Invalid email").required("Required"),
  birthday: Yup.date()
    .required("Birthday is required")
    .test("valid-birthday", "Must be at least 14 years old", function (value) {
      if (!value) {
        return false;
      }
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 14);
      return value <= minDate;
    }),
});

export interface IRegistrationFormContent {
  onSignUp: () => void;
}

const RegistrationFormContent: FC<IRegistrationFormContent> = ({
  onSignUp = () => {},
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState<string>("");

  const handleSignUp = async (values: RegistrationFormValues) => {
    setLoading(true);
    try {
      await postAccountRegistration(values);
      onSignUp();
      setSignUpError("");
      enqueueSnackbar("Successful registration", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Occurred error", {
        variant: "error",
      });
      setSignUpError("Occurred error. Check your details or try again later");
    }
    setLoading(false);
  };

  const formik = useFormik({
    validateOnMount: true,
    initialValues: defaultFormValues,
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(false);
      handleSignUp(values);
    },
  });

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      onSubmit={formik.handleSubmit}
      action=""
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "1rem", sm: "1.5rem" },
        }}
      >
        <FormControl defaultValue="" fullWidth required>
          <TextField
            disabled={loading}
            label="First name"
            variant="standard"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </FormControl>
        <FormControl defaultValue="" fullWidth required>
          <TextField
            disabled={loading}
            label="Last name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            variant="standard"
          />
        </FormControl>
      </Box>
      <FormControl defaultValue="" required>
        <TextField
          disabled={loading}
          sx={{ mt: "1rem" }}
          variant="standard"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          placeholder="Eg. recipient@email.com"
          type="email"
        />
      </FormControl>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "1rem", sm: "1.5rem" },
        }}
      >
        <FormControl variant="standard" required>
          <InputLabel htmlFor="standard-adornment-password">
            {formik.touched.password
              ? formik.errors.password !== null
                ? formik.errors.password
                : "Password"
              : "Password"}
          </InputLabel>
          <Input
            disabled={loading}
            name="password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                  }}
                  sx={{ opacity: ".5", padding: 0 }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard" required>
          <InputLabel htmlFor="standard-adornment-password">
            {formik.touched.password
              ? formik.errors.repeatPassword !== null
                ? formik.errors.repeatPassword
                : "Repeat password"
              : "Repeat password"}
          </InputLabel>
          <Input
            disabled={loading}
            name="repeatPassword"
            type={showPassword ? "text" : "password"}
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.repeatPassword &&
              Boolean(formik.errors.repeatPassword)
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                  }}
                  sx={{ opacity: ".5", padding: 0 }}
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
          disabled={loading}
          maxDate={dayjs(Date.now()).subtract(14, "year")}
          sx={{ mt: "1rem", ".MuiIconButton-root": { opacity: ".5" } }}
          disableFuture
          defaultValue={dayjs(Date.now()).subtract(14, "year")}
          value={formik.values.birthday}
          onChange={(value: any) => {
            formik.setFieldValue("birthday", new Date(value?.["$d"]), true);
          }}
          slotProps={{
            textField: {
              variant: "standard",
              error: Boolean(formik.errors.birthday),
            },
          }}
        />
      </LocalizationProvider>
      <FormControlLabel
        sx={{ ".MuiFormControlLabel-label": { opacity: ".5" } }}
        control={
          <Checkbox
            disabled={loading}
            name="isPublisher"
            value={formik.values.isPublisher}
            onChange={formik.handleChange}
          />
        }
        label="Publisher account"
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignContent: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            pr: "1rem",
          }}
          color="error"
        >
          {signUpError}
        </Typography>
        <Button
          sx={{ borderRadius: ".5rem", minWidth: "130px" }}
          size="large"
          variant={formik.isValid ? "contained" : "outlined"}
          disabled={loading || !formik.isValid}
          startIcon={<CheckCircleIcon></CheckCircleIcon>}
          type="submit"
        >
          Sign un
        </Button>
      </Box>
    </form>
  );
};

export default RegistrationFormContent;
