import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { FC, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import { IBookInformation } from "../../interfaces/IBookInformation";
import BookEditOfferModal from "./BookEditOfferModal";
import BookEditDiscountModal from "./BookEditDiscountModal";
import BookEditModal from "./BookEditModal";

export interface IBookEditMenu {
  book: IBookInformation;
  refreshBookState: () => Promise<void>;
}

const BookEditMenu: FC<IBookEditMenu> = ({ book, refreshBookState }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editBook, setEditBook] = useState<boolean>(false);
  const [editOffer, setEditOffer] = useState<boolean>(false);
  const [editDiscount, setEditDiscount] = useState<boolean>(false);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
        endIcon={<SettingsIcon></SettingsIcon>}
      >
        <Typography variant="body1">Edit</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            setEditBook(true);
          }}
        >
          Edit book
        </MenuItem>
        <MenuItem
          onClick={() => {
            setEditOffer(true);
          }}
        >
          {book?.offer?.book_id ? "Edit offer" : "Create offer"}
        </MenuItem>
        {book?.offer?.book_id && (
          <MenuItem
            onClick={() => {
              setEditDiscount(true);
            }}
          >
            {book?.discount?.discount_id ? "Edit discount" : "Create discount"}
          </MenuItem>
        )}
      </Menu>
      <BookEditOfferModal
        book={book}
        isOpened={editOffer}
        onCancel={() => {
          setEditOffer(false);
        }}
        onOfferChange={async () => {
          await refreshBookState();
          setEditOffer(false);
        }}
      />
      <BookEditDiscountModal
        book={book}
        isOpened={editDiscount}
        onCancel={() => {
          setEditDiscount(false);
        }}
        onOfferChange={async () => {
          await refreshBookState();
          setEditDiscount(false);
        }}
      />
      <BookEditModal
        book={book}
        isOpened={editBook}
        onCancel={() => {
          setEditBook(false);
        }}
        onUpdate={async () => {
          await refreshBookState();
          setEditBook(false);
        }}
      />
    </>
  );
};

export default BookEditMenu;
