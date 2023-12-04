import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Input,
  Link,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getAllAgeRestrictions } from "../../api/service";
import IAgeRestrictions from "../../interfaces/IAgeRestrictions";
import AuthorSelector from "../AuthorSelector/AuthorSelector";
import ImageDropZone from "../ImageDropZone/ImageDropZone";
import PageWrapper from "../PageWrapper/PageWrapper";
import IUser from "../../interfaces/IAuthor";

export interface IBookForm {
  defaultValues?: PublishBookFormValues;
  onPublish: (values: PublishBookFormValues) => void;
}

export interface PublishBookFormValues {
  title: string;
  description: string;
  image: File | null;
  pages: number;
  authors: IUser[];
  ageRestrictions: IAgeRestrictions;
  publicationDate: dayjs.Dayjs;
}

const minTitleLength = 3;
const maxTitleLength = 300;
const minDescriptionLength = 10;
const maxDescriptionLength = 3000;
const minPageCount = 3;
const maxPageCount = 20000;
const minAuthorsCount = 0;
const maxAuthorsCount = 30;

const defaultAgeRestriction: IAgeRestrictions = {
  age_restriction_id: 2,
  name: "adolescents",
};

const defaultFormValues: PublishBookFormValues = {
  title: "",
  description: "",
  image: null,
  pages: minPageCount,
  authors: [],
  ageRestrictions: defaultAgeRestriction,
  publicationDate: dayjs(Date.now()),
};

const SigninSchema = Yup.object().shape({
  title: Yup.string()
    .min(minTitleLength, `Title must be at least ${minTitleLength} characters`)
    .max(maxTitleLength, `Title must be at most ${maxTitleLength} characters`)
    .required("Title is required"),
  description: Yup.string()
    .min(
      minDescriptionLength,
      `Description must be at least ${minDescriptionLength} characters`
    )
    .max(
      maxDescriptionLength,
      `Description must be at most ${maxDescriptionLength} characters`
    )
    .required("Description is required"),
  image: Yup.mixed().required("required"),
  pages: Yup.number()
    .required("Count pages is required")
    .min(minPageCount, `The book must be more than ${minPageCount} pages`)
    .max(maxPageCount, `The book must be less than ${maxPageCount} pages`),
  authors: Yup.array()
    .required("Authors is required")
    .min(minAuthorsCount, `The book must have an author`)
    .max(maxAuthorsCount, `Maximum authors = ${maxAuthorsCount}`),
  ageRestrictions: Yup.object().required("Restrictions required"),
  publicationDate: Yup.date().required("Publication date required"),
});

const BookForm: FC<IBookForm> = ({
  defaultValues = defaultFormValues,
  onPublish,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [ageRestrictions, setAgeRestrictions] = useState<IAgeRestrictions[]>(
    []
  );

  const formik = useFormik({
    validateOnMount: true,
    initialValues: defaultValues,
    validationSchema: SigninSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(false);
      handlePublish(values);
    },
  });

  useEffect(() => {
    const putAgeRestrictions = async () => {
      let restrictions = await getAllAgeRestrictions();
      setAgeRestrictions(restrictions);
    };
    putAgeRestrictions();
  }, []);

  const handlePublish = async (values: PublishBookFormValues) => {
    setLoading(true);
    try {
      await onPublish(values);
    } catch (e) {
      console.log(e)
      if (e instanceof Error) {
        setError(e.message);
        setLoading(false);
        return;
      }
    }
    setError("");
    setLoading(false);
  };

  return (
    <PageWrapper>
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
          <CustomTypographyHeader>Book information</CustomTypographyHeader>
          <Typography
            component={"span"}
            gutterBottom
            variant="body1"
            color="text.secondary"
            sx={{
              marginBottom: "0",
            }}
          >
            To avoid common problems with your Bookstore book page, review the{" "}
            <Link href="" underline="hover">
              Metadata Guidelines
            </Link>{" "}
            and information from{" "}
            <Link href="" underline="hover">
              Help Center
            </Link>{" "}
            . Please review the{" "}
            <Link href="" underline="hover">
              program rules
            </Link>{" "}
            before submitting your application.
          </Typography>
          <CustomFormControl>
            <CustomTypographySecondaryHeader>
              Book title
            </CustomTypographySecondaryHeader>
            <TextField
              name="title"
              size="small"
              variant="outlined"
              disabled={loading}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={
                <Box sx={{ width: "100%", display: "flex" }}>
                  <Box sx={{ width: "100%" }}>
                    This title will be displayed in Bookstore
                  </Box>
                  <Typography
                    component={"span"}
                    gutterBottom
                    variant="body2"
                    noWrap
                    sx={{ minWidth: "fit-content" }}
                  >
                    {formik.values.title.length + "/" + maxTitleLength}
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
              Book description
            </CustomTypographySecondaryHeader>
            <TextField
              name="description"
              size="small"
              variant="outlined"
              disabled={loading}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{ sx: { borderRadius: ".75rem" } }}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                <Box sx={{ width: "100%", display: "flex" }}>
                  <Box sx={{ width: "100%" }}>
                    A brief description of your book. Users can expand it to
                    read the full description.
                  </Box>
                  <Typography
                    component={"span"}
                    gutterBottom
                    variant="body2"
                    noWrap
                    sx={{ minWidth: "fit-content" }}
                  >
                    {formik.values.description.length +
                      "/" +
                      maxDescriptionLength}
                  </Typography>
                </Box>
              }
              fullWidth
              placeholder=""
              type="text"
              multiline
              rows={4}
              inputProps={{}}
            />
          </CustomFormControl>
          <CustomTypographyHeader>
            Information about book
          </CustomTypographyHeader>
          <Typography
            component={"span"}
            gutterBottom
            variant="body1"
            color="text.secondary"
            sx={{
              marginBottom: "0",
            }}
          >
            The following data will be visible on the book page. Please check
            them for correctness before publishing.
          </Typography>
          <CustomFormControl>
            <CustomTypographySecondaryHeader>
              Number of pages
            </CustomTypographySecondaryHeader>
            <Box sx={{ display: "flex", gap: "1.5rem", width: "100%" }}>
              <Input
                name="pages"
                value={formik.values.pages}
                size="small"
                defaultValue={formik.values.pages}
                disabled={loading}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                inputProps={{
                  step: 1,
                  defaultValue: formik.values.pages,
                  min: minPageCount,
                  max: maxPageCount,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
                error={formik.touched.pages && Boolean(formik.errors.pages)}
              />
              <Slider
                max={maxPageCount}
                min={minPageCount}
                disabled={loading}
                name="pages"
                size="small"
                defaultValue={formik.values.pages}
                valueLabelDisplay="auto"
                value={
                  typeof formik.values.pages === "number"
                    ? formik.values.pages
                    : 0
                }
                sx={{ width: "100%" }}
                onChange={formik.handleChange}
                aria-labelledby="input-slider"
              />
            </Box>
          </CustomFormControl>
          <CustomFormControl>
            <CustomTypographySecondaryHeader>
              Age restrictions
            </CustomTypographySecondaryHeader>
            <Autocomplete
              disabled={loading}
              disablePortal
              options={ageRestrictions}
              sx={{ ".MuiIconButton-root": { opacity: ".5" } }}
              fullWidth
              size="small"
              value={formik.values.ageRestrictions}
              onChange={(e, value) => {
                console.log(value);
                formik.setFieldValue("ageRestrictions", value);
              }}
              getOptionLabel={(option) => option.name}
              disableClearable
              isOptionEqualToValue={(option, value) => {
                return option.age_restriction_id === value.age_restriction_id;
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ borderRadius: ".75rem" }}
                  name="ageRestrictions"
                  {...params}
                />
              )}
            />
          </CustomFormControl>
          <CustomFormControl>
            <CustomTypographySecondaryHeader>
              Publication date
            </CustomTypographySecondaryHeader>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={loading}
                sx={{
                  ".MuiIconButton-root": { opacity: ".5" },
                  borderRadius: ".75rem",
                }}
                defaultValue={dayjs(Date.now())}
                value={formik.values.publicationDate}
                onChange={(value: any) => {
                  formik.setFieldValue(
                    "publicationDate",
                    new Date(value?.["$d"]),
                    true
                  );
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    variant: "outlined",
                    error: Boolean(formik.errors.publicationDate),
                  },
                }}
              />
            </LocalizationProvider>
          </CustomFormControl>
          <CustomTypographyHeader>Graphics</CustomTypographyHeader>
          <Typography
            component={"span"}
            gutterBottom
            variant="body1"
            color="text.secondary"
            sx={{
              marginBottom: "0",
            }}
          >
            Upload a picture to promote your book in the BookStore. Before doing
            this, please read the{" "}
            <Link href="" underline="hover">
              content requirements.
            </Link>
          </Typography>
          <CustomFormControl>
            <CustomTypographySecondaryHeader>
              Book preview
            </CustomTypographySecondaryHeader>
            <ImageDropZone
              disabled={loading}
              value={formik.values.image}
              onChange={(file: File) => {
                formik.setFieldValue("image", file);
              }}
            />
          </CustomFormControl>
          <CustomFormControl>
            <CustomTypographySecondaryHeader>
              Authors
            </CustomTypographySecondaryHeader>
            <AuthorSelector
              disabled={loading}
              authors={formik.values.authors}
              onChange={(value) => {
                formik.setFieldValue("authors", value);
              }}
            />
          </CustomFormControl>
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
              {error}
            </Typography>
            <Button
              sx={{ borderRadius: ".5rem" }}
              size="large"
              disabled={!formik.isValid || loading}
              variant={formik.isValid ? "contained" : "outlined"}
              startIcon={<CheckCircleIcon></CheckCircleIcon>}
              type="submit"
            >
              Publish
            </Button>
          </Box>
        </form>
      </Box>
      <Box sx={{ mb: "5rem" }}></Box>
    </PageWrapper>
  );
};

interface ICustomTypography {
  children: string;
}

const CustomTypographyHeader: FC<ICustomTypography> = ({ children }) => {
  return (
    <Typography
      component={"span"}
      gutterBottom
      variant="h5"
      sx={{
        marginBottom: "0",
        mt: ".5rem",
      }}
      noWrap
    >
      {children}
    </Typography>
  );
};

interface ICustomFormControl {
  children: React.ReactNode;
}

const CustomFormControl: FC<ICustomFormControl> = ({ children }) => {
  return (
    <FormControl
      defaultValue=""
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: ".5rem", sm: "1.5rem" },
      }}
      required
    >
      {children}
    </FormControl>
  );
};

const CustomTypographySecondaryHeader: FC<ICustomTypography> = ({
  children,
}) => {
  return (
    <Typography
      component={"span"}
      gutterBottom
      variant="body1"
      sx={{
        width: "220px",
        marginBottom: "0",
        mt: { xs: "0rem", sm: ".5rem" },
      }}
      color="text.secondary"
      noWrap
    >
      {children}
    </Typography>
  );
};

export default BookForm;
