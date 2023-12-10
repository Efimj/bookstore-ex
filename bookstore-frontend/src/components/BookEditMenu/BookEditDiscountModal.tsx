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
import { getDeleteBookDiscount, postUpdateBookDiscount } from "../../api/book";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ClearIcon from "@mui/icons-material/Clear";

export interface IBookEditDiscountModal {
  book: IBookInformation;
  isOpened: boolean;
  onOfferChange: () => Promise<void>;
  onCancel: () => void;
}

export interface BookEditDiscountFormValues {
  price: number;
  expirationDate: dayjs.Dayjs;
}

const BookEditOfferModal: FC<IBookEditDiscountModal> = ({
  book,
  isOpened,
  onOfferChange,
  onCancel,
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const minPrice = 0;
  const maxPrice = book.offer.price - 1;

  const BookEditDiscountFormSchema = Yup.object().shape({
    expirationDate: Yup.date()
      .required("Expiration date is required")
      .test(
        "valid-expiration-date",
        "Must be at least 1 day before",
        function (value) {
          if (!value) {
            return false;
          }
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + 1);

          return value >= currentDate;
        }
      ),
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

  const defaultFormValues: BookEditDiscountFormValues = {
    price: book?.discount?.price ?? 0,
    expirationDate: dayjs().add(10, "day"),
  };

  const handleForm = async (values: BookEditDiscountFormValues) => {
    setLoading(true);
    try {
      await postUpdateBookDiscount(book.book.book_id, values);
      await onOfferChange();
      setError("");
    } catch (error) {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  const handleDiscountDeletion = async () => {
    setLoading(true);
    try {
      await getDeleteBookDiscount(book.book.book_id);
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
    validationSchema: BookEditDiscountFormSchema,
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
            gap: ".5rem",
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
                <Typography
                  component={"span"}
                  variant="body1"
                  color="text.secondary"
                  sx={{ paddingBottom: ".2rem", paddingTop: ".5rem" }}
                >
                  Book price:
                </Typography>
                <Typography component={"span"} variant="body1">
                  {book?.offer?.price && book?.offer?.price} usd
                </Typography>
                {book?.discount && (
                  <Typography
                    component={"span"}
                    variant="body1"
                    color="text.secondary"
                    sx={{ paddingBottom: ".2rem", paddingTop: ".5rem" }}
                  >
                    Old discount:
                  </Typography>
                )}
                {book?.discount && (
                  <Typography component={"span"} variant="body1">
                    {book?.discount && book?.discount?.price} usd
                  </Typography>
                )}
                <Typography
                  component={"span"}
                  variant="body1"
                  color="text.secondary"
                  sx={{ paddingBottom: ".2rem", paddingTop: ".5rem" }}
                >
                  New discount:
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
                        Discount will be displayed in Bookstore
                      </Box>
                    </Box>
                  }
                  fullWidth
                  placeholder=""
                  type="text"
                  inputProps={{}}
                />
                <Typography
                  component={"span"}
                  variant="body1"
                  color="text.secondary"
                  sx={{ paddingBottom: ".2rem", paddingTop: ".5rem" }}
                >
                  Expiration date:
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled={loading}
                    sx={{
                      ".MuiIconButton-root": { opacity: ".5" },
                      borderRadius: ".75rem",
                    }}
                    value={dayjs(formik.values.expirationDate)}
                    onChange={(value: any) => {
                      formik.setFieldValue(
                        "expirationDate",
                        new Date(value?.["$d"]),
                        true
                      );
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                        variant: "outlined",
                        error: Boolean(formik.errors.expirationDate),
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </DialogContent>
          <Box
            sx={{
              paddingRight: "1.5rem",
              paddingBottom: "1.5rem",
              paddingLeft: "1.5rem",
              display: "flex",
              gap: "1rem",
              width: "100%",
              flexWrap: "wrap-reverse",
              justifyContent: "flex-end",
            }}
          >
            {error && (
              <Typography
                component={"span"}
                sx={{ width: "100%" }}
                variant="body1"
                color="error"
              >
                {error}
              </Typography>
            )}
            <Button
              disabled={loading}
              variant="text"
              size="medium"
              onClick={onCancel}
            >
              Cancel
            </Button>
            {book?.discount && (
              <Button
                size="large"
                disabled={loading}
                variant="outlined"
                startIcon={<ClearIcon></ClearIcon>}
                onClick={handleDiscountDeletion}
              >
                Delete
              </Button>
            )}
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
        </form>
      </Paper>
    </Dialog>
  );
};

export default BookEditOfferModal;
