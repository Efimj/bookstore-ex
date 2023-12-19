import { FC, useState } from "react";
import * as Yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Link,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CustomFormControl from "../../components/CustomFormControls/CustomFormControl";
import CustomTypographyHeader from "../../components/CustomFormControls/CustomTypographyHeader";
import CustomTypographySecondaryHeader from "../../components/CustomFormControls/CustomTypographySecondaryHeader";
import { enqueueSnackbar } from "notistack";
import { observer } from "mobx-react-lite";
import userStore from "../../store/UserStore";
import { useFormik } from "formik";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { postUpdateAccountPassword } from "../../api/user";

export interface EditPasswordFormValues {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

const minPasswordLength = 2;
const maxPasswordLength = 50;

const EditPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Password is required")
    .min(
      minPasswordLength,
      `Password must be at least ${minPasswordLength} characters`
    )
    .max(
      maxPasswordLength,
      `The password must be no more than ${maxPasswordLength} characters`
    )
    .matches(
      /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
      "Password must meet the criteria"
    ),
  newPassword: Yup.string()
    .required("Password is required")
    .min(
      minPasswordLength,
      `Password must be at least ${minPasswordLength} characters`
    )
    .max(
      maxPasswordLength,
      `The password must be no more than ${maxPasswordLength} characters`
    )
    .matches(
      /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
      "Password must meet the criteria"
    ),
  repeatPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match"),
});

export interface IEditPasswordFormContent {
  onUpdate: () => void;
}

const EditPasswordForm: FC<IEditPasswordFormContent> = observer(
  ({ onUpdate = () => {} }) => {
    const user = userStore.user;
    if (user === null) throw "unauthorize";
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);

    const defaultFormValues = (): EditPasswordFormValues => {
      return {
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      };
    };

    const handleUpdate = async (values: EditPasswordFormValues) => {
      setLoading(true);
      try {
        await postUpdateAccountPassword(values);
        enqueueSnackbar("Successful updated", {
          variant: "success",
        });
        userStore.tryRefreshAuth();
        refreshForm();
        setIsEditing(false);
      } catch (error) {
        enqueueSnackbar("Occurred error", {
          variant: "error",
        });
        setError("Occurred error. Check your details or try again later");
      }
      setLoading(false);
    };

    const formik = useFormik({
      validateOnMount: true,
      initialValues: defaultFormValues(),
      validationSchema: EditPasswordSchema,
      onSubmit: (values, actions) => {
        actions.setSubmitting(false);
        handleUpdate(values);
      },
    });

    const refreshForm = () => {
      setIsEditing(false);
      formik.resetForm();
      formik.setValues({
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      });
      setTimeout(() => {
        formik.validateForm();
      }, 110);
    };

    return (
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            maxWidth: "750px",
          }}
          onSubmit={formik.handleSubmit}
          action=""
        >
          <CustomTypographyHeader>Password</CustomTypographyHeader>
          <Typography
            component={"span"}
            gutterBottom
            variant="body1"
            color="text.secondary"
            sx={{
              marginBottom: "0",
            }}
          >
            You need to make a{" "}
            <Link href="" underline="hover">
              secure password
            </Link>
            . The password must be at least {minPasswordLength} characters and
            contain uppercase.
          </Typography>
          <CustomFormControl>
            <CustomTypographySecondaryHeader>
              Old password
            </CustomTypographySecondaryHeader>
            <TextField
              disabled={loading || !isEditing}
              name="oldPassword"
              type={showPassword ? "text" : "password"}
              value={formik.values.oldPassword}
              placeholder="Old password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              size="small"
              error={
                formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {
                        event.preventDefault();
                      }}
                      sx={{ opacity: ".5", padding: 0 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </CustomFormControl>
          <CustomFormControl>
            <CustomTypographySecondaryHeader>
              New password
            </CustomTypographySecondaryHeader>
            <TextField
              disabled={loading || !isEditing}
              name="newPassword"
              type={showPassword ? "text" : "password"}
              value={formik.values.newPassword}
              placeholder="New password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="small"
              fullWidth
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {
                        event.preventDefault();
                      }}
                      sx={{ opacity: ".5", padding: 0 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </CustomFormControl>
          <CustomFormControl>
            <CustomTypographySecondaryHeader>
              Repeat new password
            </CustomTypographySecondaryHeader>
            <TextField
              disabled={loading || !isEditing}
              name="repeatPassword"
              type={showPassword ? "text" : "password"}
              value={formik.values.repeatPassword}
              placeholder="Repeat new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="small"
              fullWidth
              error={
                formik.touched.repeatPassword &&
                Boolean(formik.errors.repeatPassword)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {
                        event.preventDefault();
                      }}
                      sx={{ opacity: ".5", padding: 0 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </CustomFormControl>
          <Box
            sx={{
              mt: ".5rem",
              flexWrap: "wrap-reverse",
              gap: "0rem",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {error && (
              <Typography component={"span"} variant="body1" color="error">
                {error}
              </Typography>
            )}
            <Box
              sx={{
                display: !isEditing ? "flex" : "none",
                gap: "1rem",
                justifyContent: "flex-end",
              }}
            >
              <Button
                disabled={isEditing}
                variant="outlined"
                size="medium"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit password
              </Button>
            </Box>
            <Box
              sx={{
                display: isEditing ? "flex" : "none",
                gap: "1rem",
                justifyContent: "flex-end",
              }}
            >
              <Button
                disabled={loading || !isEditing}
                variant="text"
                size="medium"
                onClick={refreshForm}
              >
                Cancel
              </Button>
              <Button
                size="medium"
                disabled={!formik.isValid || loading || !isEditing}
                variant={formik.isValid ? "contained" : "outlined"}
                startIcon={<CheckCircleIcon></CheckCircleIcon>}
                type="submit"
              >
                Update
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    );
  }
);

export default EditPasswordForm;
