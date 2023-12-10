import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogContent,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import { IBookInformation } from "../../interfaces/IBookInformation";
import * as Yup from "yup";
import { useFormik } from "formik";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { postUpdateBookOffer } from "../../api/book";

export interface IBookEditOfferModal {
  book: IBookInformation;
  isOpened: boolean;
  onOfferChange: () => Promise<void>;
  onCancel: () => void;
}

export interface BookEditOfferFormValues {
  price: number;
}

const minPrice = 0;
const maxPrice = 10000;

const BookEditOfferFormSchema = Yup.object().shape({
  price: Yup.number()
    .required("Count pages is required")
    .min(minPrice, `The book price must be more than ${minPrice} usd`)
    .max(maxPrice, `The book price must be less than ${maxPrice} usd`)
    .test(
      "decimalPlaces",
      "Only up to 2 decimal places are allowed",
      (value) => {
        if (value === undefined || value === null) {
          return true; // Skip validation for undefined or null values
        }

        if (!Number.isInteger(value)) {
          // Check decimal places only for non-integer values
          const decimalPlaces = value.toString().split(".")[1]?.length || 0;
          return decimalPlaces <= 2;
        }

        return true; // For integer values, no need to check decimal places
      }
    ),
});

const BookEditOfferModal: FC<IBookEditOfferModal> = ({
  book,
  isOpened,
  onOfferChange,
  onCancel,
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const defaultFormValues: BookEditOfferFormValues = {
    price: book?.offer?.price ?? 0,
  };

  const handleForm = async (values: BookEditOfferFormValues) => {
    setLoading(true);
    try {
      await postUpdateBookOffer(book.book.book_id, values);
      await onOfferChange();
      setError("");
    } catch (error) {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  const formik = useFormik({
    validateOnMount: true,
    initialValues: defaultFormValues,
    validationSchema: BookEditOfferFormSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(false);
      handleForm(values);
    },
  });

  return (
    <Dialog
      open={isOpened}
      onClose={onCancel}
      sx={{
        backdropFilter: "blur(5px) sepia(5%)",
      }}
      PaperProps={{
        sx: {
          margin: "1rem",
          borderRadius: "1.5rem",
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <Paper>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            maxWidth: "750px",
            backgroundColor: "transparent",
          }}
          onSubmit={formik.handleSubmit}
          action=""
        >
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: "1rem", sm: "0" },
            }}
          >
            <CardMedia
              component="img"
              alt="451 degrees Fahrenheit.jpeg"
              sx={{
                padding: 0,
                maxWidth: "45%",
                height: "100%",
                borderRadius: "1rem",
              }}
              image={book.book?.image}
            />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                marginLeft: { xs: "0rem", sm: "1rem" },
                alignContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Typography component={"span"} variant="h5">
                  {book?.book?.title}
                </Typography>
                <Box sx={{ height: "1rem" }}></Box>
                {book?.offer?.price && (
                  <Typography
                    component={"span"}
                    variant="body1"
                    color="text.secondary"
                  >
                    Old price:
                  </Typography>
                )}
                {book?.offer?.price && (
                  <Typography component={"span"} variant="body1">
                    {book?.discount
                      ? book?.discount?.price
                      : book?.offer?.price}{" "}
                    usd
                  </Typography>
                )}
                <Typography
                  component={"span"}
                  variant="body1"
                  color="text.secondary"
                  sx={{ paddingBottom: ".2rem", paddingTop: ".5rem" }}
                >
                  New price:
                </Typography>
                <TextField
                  name="price"
                  size="small"
                  variant="outlined"
                  disabled={loading}
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  InputProps={{
                    endAdornment: (
                      <Typography
                        component={"span"}
                        variant="body1"
                        color="text.secondary"
                      >
                        usd
                      </Typography>
                    ),
                  }}
                  helperText={
                    <Box sx={{ width: "100%", display: "flex" }}>
                      <Box sx={{ width: "100%" }}>
                        Price will be displayed in Bookstore
                      </Box>
                    </Box>
                  }
                  fullWidth
                  placeholder=""
                  type="text"
                  inputProps={{}}
                />
              </Box>
              <Box
                sx={{
                  mt: "1rem",
                  display: "flex",
                  gap: "1rem",
                  width: "100%",
                  flexWrap: "wrap-reverse",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  disabled={loading}
                  variant="text"
                  size="medium"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  size="large"
                  disabled={!formik.isValid || loading}
                  variant={formik.isValid ? "contained" : "outlined"}
                  startIcon={<CheckCircleIcon></CheckCircleIcon>}
                  type="submit"
                >
                  Apply
                </Button>
              </Box>
              {error && (
                <Typography component={"span"} variant="body1" color="error">
                  {error}
                </Typography>
              )}
            </Box>
          </DialogContent>
        </form>
      </Paper>
    </Dialog>
  );
};

export default BookEditOfferModal;
