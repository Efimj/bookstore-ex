import {
  Box,
  Paper,
  CardMedia,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import { FC, useState } from "react";
import IUser from "../../interfaces/IAuthor";
import IBookPageItem from "./IBookPageItem";
import BookStackItem from "./BookStackItem";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import UserCard from "../../components/UserCard/UserCard";
import BookPurchaseModal from "../../components/BookPurchaseModal/BookPurchaseModal";
import { observer } from "mobx-react-lite";
import userStore from "../../store/UserStore";
import BookEditMenu from "../../components/BookEditMenu/BookEditMenu";

const BookInformation: FC<IBookPageItem> = observer(
  ({ book, bookSate, updateBookState }) => {
    const navigate = useNavigate();
    const [purchaseDialogOpened, setPurchaseDialogOpened] =
      useState<boolean>(false);

    const getBookBuyButtonText = (): string => {
      let inLibrary = "";
      if (bookSate?.check) inLibrary = `In library`;
      if (book.offer == null) return `not for sale ${inLibrary}`;
      if (book.discount != null)
        return `Buy for ${book.discount.price} usd. ${inLibrary}`;
      return `Buy for ${book.offer.price} usd. ${inLibrary}`;
    };

    const handleAuthorNavigation = (position: string) => {
      navigate(`/user/${position}`);
    };

    const onPurchase = async () => {
      await updateBookState();
      setPurchaseDialogOpened(false);
    };

    return (
      <>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: { xs: ".75rem", sm: "1.25rem", md: "2rem" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
                overflow: "hidden",
                display: "flex",
                gap: "1rem",
              }}
            >
              <Paper
                sx={{
                  display: { xs: "block", md: "none" },
                  height: "100%",
                  width: { xs: "180px", sm: "210px", md: "240px" },
                }}
                elevation={16}
              >
                <CardMedia
                  component="img"
                  alt="451 degrees Fahrenheit.jpeg"
                  sx={{
                    padding: 0,
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  image={book?.book?.image}
                />
              </Paper>
              <div>
                <Typography
                  variant="h4"
                  sx={{ paddingBottom: "1rem" }}
                  fontWeight={"600"}
                >
                  {book?.book?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book?.book?.publication_date.toLocaleString()}
                </Typography>
                <Stack
                  sx={{ paddingTop: ".5rem", width: "100%" }}
                  direction="row"
                  spacing={{ xs: 0.75, sm: 1 }}
                  useFlexGap
                  flexWrap="wrap"
                >
                  {book?.authors
                    ?.slice(0, 6)
                    .map((user: IUser, index: number) => {
                      return (
                        <Box key={index} sx={{ paddingY: "5px" }}>
                          <UserCard
                            user={user}
                            onClick={() =>
                              handleAuthorNavigation(user.user_id.toString())
                            }
                          />
                        </Box>
                      );
                    })}
                </Stack>
              </div>
            </Box>
            <Stack
              direction="row"
              sx={{
                overflow: "auto",
                gap: "2rem",
                paddingY: "1rem",
                flexWrap: "nowrap",
              }}
              divider={
                <Divider orientation="vertical" flexItem variant="middle" />
              }
            >
              <BookStackItem
                title={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body1" sx={{ paddingTop: "2px" }}>
                      {book?.evaluations?.average_rating ?? 0}
                    </Typography>
                    <StarRateRoundedIcon fontSize="inherit" />
                  </Box>
                }
                description={`${book?.evaluations?.review_count ?? 0} reviews`}
              />
              <BookStackItem
                title={<BookOutlinedIcon fontSize="small" />}
                description="EBook"
              />
              <BookStackItem
                title={book?.book?.page_count}
                description="Page count"
              />
            </Stack>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: ".75rem", sm: "1.25rem" },
                width: { xs: "100%", sm: "fit-content" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "0.5rem",
                  width: { xs: "100%", sm: "fit-content" },
                }}
              >
                <Button
                  sx={{
                    textTransform: "none",
                    width: { xs: "100%", sm: "fit-content" },
                  }}
                  disabled={
                    book?.offer == null || bookSate?.check ? true : false
                  }
                  disableElevation={true}
                  variant="contained"
                  onClick={() => {
                    setPurchaseDialogOpened(true);
                  }}
                >
                  <Box sx={{ display: "flex", gap: ".5rem" }}>
                    {book?.discount && (
                      <Typography
                        variant="body1"
                        color={"#FFFFFF"}
                        sx={{ opacity: ".7", textDecoration: "line-through" }}
                      >
                        {book?.offer && `${book?.offer.price} usd.`}
                      </Typography>
                    )}
                    <Typography variant="body1" color={"#FFFFFF"}>
                      {getBookBuyButtonText()}
                    </Typography>
                  </Box>
                </Button>
                {bookSate?.author && (
                  <BookEditMenu
                    refreshBookState={updateBookState}
                    book={book}
                  />
                )}
              </Box>
              <Button
                sx={{ textTransform: "none" }}
                variant="outlined"
                onClick={() => {
                  bookSate?.wish
                    ? enqueueSnackbar("Removed from wishlist", {
                        variant: "success",
                      })
                    : enqueueSnackbar("Added to wishlist", {
                        variant: "success",
                      });
                }}
              >
                <Typography variant="body1">
                  {bookSate?.wish ? "Added to wishlist" : "Add to wishlist"}
                </Typography>
              </Button>
              <Button
                sx={{ textTransform: "none", borderRadius: "10px" }}
                variant="text"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  enqueueSnackbar("Link copied", { variant: "success" });
                }}
              >
                <Typography variant="body1">Share</Typography>
              </Button>
            </Box>
          </Box>
          <Paper
            sx={{
              display: { xs: "none", md: "block" },
              height: "100%",
              width: { xs: "180px", sm: "210px", md: "240px" },
            }}
            elevation={16}
          >
            <CardMedia
              component="img"
              alt="451 degrees Fahrenheit.jpeg"
              sx={{
                padding: 0,
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              image={book?.book?.image}
            />
          </Paper>
        </Box>
        {userStore.user &&
          (book?.discount?.discount_id || book?.offer?.offer_id) && (
            <BookPurchaseModal
              book={book}
              isOpened={purchaseDialogOpened}
              onCancel={() => {
                setPurchaseDialogOpened(false);
              }}
              onPurchase={onPurchase}
            />
          )}
      </>
    );
  }
);

export default BookInformation;
