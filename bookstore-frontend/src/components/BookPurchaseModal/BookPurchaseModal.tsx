import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogContent,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import { IBookInformation } from "../../interfaces/IBookInformation";
import { purchaseBook } from "../../api/user";

export interface IBookPurchaseModal {
  book: IBookInformation;
  isOpened: boolean;
  onPurchase: () => Promise<void>;
  onCancel: () => void;
}

const BookPurchaseModal: FC<IBookPurchaseModal> = ({
  book,
  isOpened,
  onPurchase,
  onCancel,
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handlePurchase = async () => {
    setLoading(true);
    try {
      await purchaseBook(book.book.book_id.toString());
      await onPurchase();
      setError("");
    } catch (error) {
      setError("Something went wrong");
    }
    setLoading(false);
  };

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
        <DialogContent sx={{ display: "flex" }}>
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
              marginLeft: "1rem",
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
              <Typography
                component={"span"}
                variant="body1"
                color="text.secondary"
              >
                Buy the book:
              </Typography>
              <Typography component={"span"} variant="h5">
                {book?.book?.title}
              </Typography>
              <Box sx={{ height: "1rem" }}></Box>
              <Typography
                component={"span"}
                variant="body1"
                color="text.secondary"
              >
                Buy for:
              </Typography>
              <Typography component={"span"} variant="h6">
                {book?.discount ? book?.discount?.price : book?.offer?.price}{" "}
                usd
              </Typography>
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
                disabled={loading}
                variant="contained"
                size="medium"
                onClick={handlePurchase}
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
      </Paper>
    </Dialog>
  );
};

export default BookPurchaseModal;
