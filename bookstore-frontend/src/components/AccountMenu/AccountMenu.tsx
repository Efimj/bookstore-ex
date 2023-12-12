import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import { Logout } from "@mui/icons-material";
import React from "react";
import { observer } from "mobx-react-lite";
import userStore from "../../store/UserStore";
import { stringAvatar } from "../../utils/utils";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightMode";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../theming/ThemeContextProvider";
import { NavigateAccountPageRoute } from "../../pages/AccoutPage/AccountPage";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";

export interface IAccountMenu {}

const AccountMenu: FC<IAccountMenu> = observer(({}) => {
  const { mode, toggleColorMode } = useThemeContext();
  const [authorization, setAuthorization] = useState<boolean>(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const togleTheme = () => {
    toggleColorMode();
  };

  const user = userStore.user;

  if (user === null)
    return (
      <>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={togleTheme}>
            <ListItemIcon>
              {mode === "light" ? (
                <Brightness4OutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </ListItemIcon>
            Theme
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAuthorization(true);
            }}
          >
            <ListItemIcon>
              <LoginOutlinedIcon />
            </ListItemIcon>
            Log In
          </MenuItem>
        </Menu>
        <AuthorizationForm
          isOpened={authorization}
          onDismiss={() => {
            setAuthorization(false);
          }}
          onSignIn={() => {
            setAuthorization(false);
          }}
          onSignUp={() => {
            setAuthorization(false);
          }}
        />
      </>
    );

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              {...(user.image && { alt: user.first_name, src: user.image })}
              {...(!user.image &&
                stringAvatar(user.first_name, user.last_name))}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            navigate(NavigateAccountPageRoute());
          }}
          sx={{ gap: ".5rem" }}
        >
          <Avatar
            {...(user.image && { alt: user.first_name, src: user.image })}
            {...(!user.image && stringAvatar(user.first_name, user.last_name))}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {user.first_name + " " + user.last_name}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: "-4px" }}
            >
              {user.email}
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={togleTheme}>
          <ListItemIcon>
            {mode === "light" ? (
              <Brightness4OutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </ListItemIcon>
          Theme
        </MenuItem>
        <MenuItem onClick={userStore.logOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
});

export default AccountMenu;
