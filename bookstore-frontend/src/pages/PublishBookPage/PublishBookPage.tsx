import { FC } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

export const PublishBookPageRoute = "/publish";
export const NavigatePublishBookPageRoute = (): string => `/publish`;

export interface IPublishBookPage {}

interface PublishBookFormValues {
  title: string;
  description: string;
  image: string;
  pages: number;
  authors: number[];
  ageRestrictions: number;
  publicationDate: dayjs.Dayjs;
}

const defaultFormValues: PublishBookFormValues = {
  title: "",
  description: "",
  image: "",
  pages: 0,
  authors: [],
  ageRestrictions: 0,
  publicationDate: dayjs(Date.now()),
};

const maxTitleLength = 300;
const maxDescriptionLength = 3000;

const SigninSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .max(maxTitleLength, `Title must be at most ${maxTitleLength} characters`)
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(
      maxDescriptionLength,
      `Description must be at most ${maxDescriptionLength} characters`
    )
    .required("Description is required"),
  image: Yup.string().required("Image is required"),
  pages: Yup.number()
    .required("Count pages is required")
    .min(3, "The book must be more than 3 pages"),
  authors: Yup.array()
    .of(Yup.number())
    .required("Authors is required")
    .min(1, "The book must have an author")
    .max(30, "Maximum authors = 30"),
  ageRestrictions: Yup.number().required("Restrictions required"),
  publicationDate: Yup.date().required("Publication date required"),
});

const PublishBookPage: FC<IPublishBookPage> = ({}) => {
  const handlePublish = (values: PublishBookFormValues) => {};

  const formik = useFormik({
    validateOnMount: true,
    initialValues: defaultFormValues,
    validationSchema: SigninSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(false);
      handlePublish(values);
    },
  });

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
          <FormControl
            defaultValue=""
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: ".5rem", sm: "1.5rem" },
            }}
            required
          >
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
              Book title
            </Typography>
            <TextField
              name="title"
              size="small"
              variant="outlined"
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
          </FormControl>
          <FormControl
            defaultValue=""
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: ".5rem", sm: "1.5rem" },
            }}
            required
          >
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
              Book description
            </Typography>
            <TextField
              name="description"
              size="small"
              variant="outlined"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
          </FormControl>
        </form>
      </Box>
    </PageWrapper>
  );
};

export default PublishBookPage;
