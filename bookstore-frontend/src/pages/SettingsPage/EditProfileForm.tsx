import dayjs from "dayjs";
import { FC, useState } from "react";
import * as Yup from "yup";
import { Box, Typography, TextField, Link, Button } from "@mui/material";
import CustomFormControl from "../../components/CustomFormControls/CustomFormControl";
import CustomTypographyHeader from "../../components/CustomFormControls/CustomTypographyHeader";
import CustomTypographySecondaryHeader from "../../components/CustomFormControls/CustomTypographySecondaryHeader";
import { enqueueSnackbar } from "notistack";
import { observer } from "mobx-react-lite";
import userStore from "../../store/UserStore";
import { getFileFromBase64 } from "../../utils/utils";
import { useFormik } from "formik";
import ImageDropZone from "../../components/ImageDropZone/ImageDropZone";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { postUpdateAccountData } from "../../api/user";

export interface EditProfileFormValues {
  image: File | null;
  firstName: string;
  lastName: string;
  birthday: dayjs.Dayjs;
}

const minFirstNameLength = 2;
const maxFirstNameLength = 50;
const minLastNameLength = 2;
const maxLastNameLength = 50;

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(minFirstNameLength, "Too Short!")
    .max(maxFirstNameLength, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(minLastNameLength, "Too Short!")
    .max(maxLastNameLength, "Too Long!")
    .required("Required"),
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
  image: Yup.mixed().required("required"),
});

export interface IEditProfileFormContent {
  onUpdate: () => void;
}

const EditProfileFormContent: FC<IEditProfileFormContent> = observer(
  ({ onUpdate = () => {} }) => {
    const user = userStore.user;
    if (user === null) throw "unauthorize";
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const defaultFormValues = (): EditProfileFormValues => {
      return {
        image: getFileFromBase64(user.image, "userImage.jpg"),
        firstName: user.first_name,
        lastName: user.last_name,
        birthday: dayjs(user.birthday),
      };
    };

    const handleUpdate = async (values: EditProfileFormValues) => {
      if (values.image === null) return;
      setLoading(true);
      try {
        await postUpdateAccountData({
          firstName: values.firstName,
          lastName: values.lastName,
          birthday: values.birthday,
          image: values.image,
        });
        enqueueSnackbar("Successful updated", {
          variant: "success",
        });
        userStore.tryRefreshAuth()
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
      validationSchema: ProfileSchema,
      onSubmit: (values, actions) => {
        actions.setSubmitting(false);
        handleUpdate(values);
      },
    });

    const refreshForm = () => {
      setIsEditing(false);
      formik.resetForm();
      formik.setValues({
        image: getFileFromBase64(user.image, "userImage.jpg"),
        firstName: user.first_name,
        lastName: user.last_name,
        birthday: dayjs(user.birthday),
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
          <CustomTypographyHeader>Your profile</CustomTypographyHeader>
          <Typography
            component={"span"}
            gutterBottom
            variant="body1"
            color="text.secondary"
            sx={{
              marginBottom: "0",
            }}
          >
            To avoid common problems with your Bookstore profile page, review
            the{" "}
            <Link href="" underline="hover">
              Metadata Guidelines
            </Link>{" "}
            and information from{" "}
            <Link href="" underline="hover">
              Help Center
            </Link>
            .
          </Typography>
          <CustomFormControl>
            <CustomTypographySecondaryHeader>
              Profile image
            </CustomTypographySecondaryHeader>
            <ImageDropZone
              disabled={loading || !isEditing}
              value={formik.values.image}
              onChange={(file: File) => {
                formik.setFieldValue("image", file);
              }}
            />
          </CustomFormControl>
          <CustomFormControl>
            <CustomTypographySecondaryHeader>
              First name
            </CustomTypographySecondaryHeader>
            <TextField
              name="firstName"
              size="small"
              variant="outlined"
              disabled={loading || !isEditing}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={
                <Box sx={{ width: "100%", display: "flex" }}>
                  <Box sx={{ width: "100%" }}>
                    This field will be displayed in Bookstore
                  </Box>
                  <Typography
                    component={"span"}
                    gutterBottom
                    variant="body2"
                    noWrap
                    sx={{ minWidth: "fit-content" }}
                  >
                    {formik.values.firstName.length + "/" + maxFirstNameLength}
                  </Typography>
                </Box>
              }
              fullWidth
              placeholder=""
              type="text"
              inputProps={{}}
            />
          </CustomFormControl>
          <CustomFormControl>
            <CustomTypographySecondaryHeader>
              Last name
            </CustomTypographySecondaryHeader>
            <TextField
              name="lastName"
              size="small"
              variant="outlined"
              disabled={loading || !isEditing}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={
                <Box sx={{ width: "100%", display: "flex" }}>
                  <Box sx={{ width: "100%" }}>
                    This field will be displayed in Bookstore
                  </Box>
                  <Typography
                    component={"span"}
                    gutterBottom
                    variant="body2"
                    noWrap
                    sx={{ minWidth: "fit-content" }}
                  >
                    {formik.values.lastName.length + "/" + maxLastNameLength}
                  </Typography>
                </Box>
              }
              fullWidth
              placeholder=""
              type="text"
              inputProps={{}}
            />
          </CustomFormControl>
          <CustomFormControl>
            <CustomTypographySecondaryHeader>
              Birthday date
            </CustomTypographySecondaryHeader>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={loading || !isEditing}
                sx={{
                  ".MuiIconButton-root": { opacity: ".5" },
                  borderRadius: ".75rem",
                }}
                // defaultValue={dayjs(Date.now())}
                value={formik.values.birthday}
                onChange={(value: any) => {
                  formik.setFieldValue(
                    "birthday",
                    new Date(value?.["$d"]),
                    true
                  );
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    variant: "outlined",
                    error: Boolean(formik.errors.birthday),
                  },
                }}
              />
            </LocalizationProvider>
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
                Edit profile
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

export default EditProfileFormContent;
