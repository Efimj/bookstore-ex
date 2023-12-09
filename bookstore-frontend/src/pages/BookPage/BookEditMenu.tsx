import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { FC, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";

import React from "react";
import { IBookInformation } from "../../interfaces/IBookInformation";

export interface IBookEditMenu {
  book: IBookInformation;
}

const BookEditMenu: FC<IBookEditMenu> = ({ book }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
        <MenuItem onClick={() => {}}>Edit book</MenuItem>
        <MenuItem onClick={() => {}}>
          {book?.offer?.book_id ? "Edit offer" : "Create offer"}
        </MenuItem>
        {book?.offer?.book_id && (
          <MenuItem onClick={() => {}}>
            {book?.discount?.discount_id ? "Edit discount" : "Create discount"}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default BookEditMenu;
