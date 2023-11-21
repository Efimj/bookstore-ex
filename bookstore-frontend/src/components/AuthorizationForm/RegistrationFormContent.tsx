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
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  birthday: Date;
  isPublisher: boolean;
  password: string;
  repeatPassword: string;
  email: string;
}

const defaultFormValues: RegistrationFormValues = {
  firstName: "",
  lastName: "",
  birthday: new Date(new Date().setFullYear(-14)),
  isPublisher: false,
  password: "",
  repeatPassword: "",
  email: "",
};

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
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
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (values: RegistrationFormValues) => {
    onSignUp();
  };

  const formik = useFormik({
    validateOnMount: true,
    initialValues: defaultFormValues,
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      handleSignUp(values);
    },
  });

  const maxDate = () => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 20);
    return dayjs(maxDate);
  };

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Box sx={{ display: "flex", gap: "1.5rem" }}>
        <FormControl defaultValue="" fullWidth required>
          <TextField
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
      <Box sx={{ display: "flex", gap: "1.5rem" }}>
        <FormControl variant="standard" required>
          <InputLabel htmlFor="standard-adornment-password">
            {formik.touched.password
              ? formik.errors.password !== null
                ? formik.errors.password
                : "Password"
              : "Password"}
          </InputLabel>
          <Input
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
            {formik.touched.password
              ? formik.errors.repeatPassword !== null
                ? formik.errors.repeatPassword
                : "Repeat password"
              : "Repeat password"}
          </InputLabel>
          <Input
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
          maxDate={maxDate()}
          sx={{ mt: "1rem", ".MuiIconButton-root": { opacity: ".5" } }}
          disableFuture
          defaultValue={maxDate()}
          value={formik.values.birthday.toUTCString()}
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
        control={<Checkbox name="isPublisher" />}
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
          variant={formik.isValid ? "contained" : "outlined"}
          disabled={!formik.isValid}
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
