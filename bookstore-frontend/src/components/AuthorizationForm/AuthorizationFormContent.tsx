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
import { FC, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useFormik } from "formik";
import * as Yup from "yup";

interface AuthorizationFormValues {
  password: string;
  email: string;
  saveStatus: boolean;
}

const defaultFormValues: AuthorizationFormValues = {
  password: "",
  email: "",
  saveStatus: false,
};

const SigninSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export interface IAuthorizationFormContent {
  onSignIn: () => void;
}

const AuthorizationFormContent: FC<IAuthorizationFormContent> = ({
  onSignIn = () => {},
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (values: AuthorizationFormValues) => {
    onSignIn();
    console.log(values);
  };

  const formik = useFormik({
    validateOnMount: true,
    initialValues: defaultFormValues,
    validationSchema: SigninSchema,
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
      <FormControlLabel
        sx={{ ".MuiFormControlLabel-label": { opacity: ".5" } }}
        control={
          <Checkbox
            name="saveStatus"
            value={formik.values.saveStatus}
            onChange={formik.handleChange}
          />
        }
        label="Save loggined status"
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
          Sign in
        </Button>
      </Box>
    </form>
  );
};

export default AuthorizationFormContent;
