import {
  Box,
  Button,
  Rating,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import IBookReview from "../../interfaces/IBookReview";
import * as Yup from "yup";
import { useFormik } from "formik";
import UserCard from "../UserCard/UserCard";
import { observer } from "mobx-react-lite";
import userStore from "../../store/UserStore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { getDeleteBookReview, postPublishBookReview } from "../../api/book";

export interface IUserBookReview {
  book_id: number;
  review?: IBookReview;
  onSave: () => Promise<void>;
  onDelete: () => Promise<void>;
}

export interface UserBookReviewFormValues {
  rating: number;
  description: string;
}

const minRating = 1;
const maxRating = 5;
const minDescription = 0;
const maxDescription = 500;

const UserBookReviewFormSchema = Yup.object().shape({
  rating: Yup.number()
    .required("Count pages is required")
    .min(minRating, `Rating must be more than ${minRating}`)
    .max(maxRating, `Rating must be less than ${maxRating}`),
  description: Yup.string()
    .min(minDescription, `Description must be more than ${minDescription}`)
    .max(maxDescription, `Description must be less than ${maxDescription}`),
});

const UserBookReview: FC<IUserBookReview> = observer(
  ({ book_id, review = null, onSave, onDelete }) => {
    const user = userStore.user;

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const defaultFormValues: UserBookReviewFormValues = {
      rating: review?.rating ?? 0,
      description: review?.description ?? "",
    };

    const formik = useFormik({
      validateOnMount: true,
      initialValues: defaultFormValues,
      validationSchema: UserBookReviewFormSchema,
      onSubmit: (values, actions) => {
        actions.setSubmitting(false);
        handleForm(values);
      },
    });

    const handleForm = async (values: UserBookReviewFormValues) => {
      setLoading(true);
      try {
        await postPublishBookReview(book_id, values);
        await onSave();
        setError("");
      } catch (error) {
        setError("Something went wrong");
      }
      setLoading(false);
    };

    const deleteReview = async () => {
      if (!review?.book_id) return;
      setLoading(true);
      try {
        await getDeleteBookReview(review?.book_id);
        await onDelete();
        setError("");
      } catch (error) {
        setError("Something went wrong");
      }
      setLoading(false);
    };

    useEffect(() => {
      refreshForm();
    }, [review]);

    const checkEditing = () => {
      if (!review) setIsEditing(true);
      else setIsEditing(false);
    };

    useEffect(() => {
      checkEditing();
    }, []);

    const refreshForm = () => {
      checkEditing();
      formik.resetForm();
      formik.setValues({
        rating: review?.rating ?? 0,
        description: review?.description ?? "",
      });
      setTimeout(() => {
        formik.validateForm();
      }, 110);
    };

    if (user === null) return <></>;

    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: "1rem",
          borderRadius: "1rem",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            backgroundColor: "transparent",
          }}
          onSubmit={formik.handleSubmit}
          action=""
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <UserCard user={user} onClick={() => {}} disabled />
            <Rating
              disabled={loading || !isEditing}
              sx={{ mt: ".5rem", mb: ".5rem" }}
              name="rating"
              size="large"
              value={formik.values.rating}
              onChange={(event, newValue) => {
                formik.setFieldValue("rating", newValue ?? 0);
              }}
            />
            <Typography
              component={"span"}
              gutterBottom
              variant="body1"
              sx={{
                width: "220px",
                marginBottom: "0",
              }}
              color="text.secondary"
              noWrap
            >
              Review description
            </Typography>
            <TextField
              name="description"
              size="small"
              variant="outlined"
              fullWidth
              disabled={loading || !isEditing}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              placeholder=""
              type="text"
              multiline
              rows={3}
              inputProps={{ style: { resize: "both" } }}
              helperText={
                <Box sx={{ width: "100%", display: "flex" }}>
                  <Box sx={{ width: "100%" }}></Box>
                  <Typography
                    component={"span"}
                    gutterBottom
                    variant="body2"
                    noWrap
                    sx={{ minWidth: "fit-content" }}
                  >
                    {formik.values.description.length + "/" + maxDescription}
                  </Typography>
                </Box>
              }
            />
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
                  Edit review
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
                {review && (
                  <Button
                    disabled={loading || !isEditing}
                    variant="outlined"
                    size="medium"
                    onClick={deleteReview}
                    startIcon={<DeleteOutlineIcon></DeleteOutlineIcon>}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  size="medium"
                  disabled={!formik.isValid || loading || !isEditing}
                  variant={formik.isValid ? "contained" : "outlined"}
                  startIcon={<CheckCircleIcon></CheckCircleIcon>}
                  type="submit"
                >
                  Publish
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    );
  }
);

export default UserBookReview;
