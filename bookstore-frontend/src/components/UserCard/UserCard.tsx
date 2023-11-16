import { Avatar, Box, CardActionArea, Typography } from "@mui/material";
import { FC } from "react";
import IUser from "../../interfaces/IAuthor";
import { stringAvatar } from "../../utils/utils";

export interface IUserCard {
  user: IUser;
  onClick: () => void;
}

const UserCard: FC<IUserCard> = ({ user, onClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          borderRadius: "20px",
          width: "fit-content",
          transition: "all linear 200ms",
          "&:hover": {
            boxShadow: 2,
          },
        }}
      >
        <Avatar
          {...(user.image && { alt: user.first_name, src: user.image })}
          {...(!user.image && stringAvatar(user.first_name, user.last_name))}
        />
        <Typography variant="body1">{user.first_name}</Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            gap: "1rem",
          }}
        ></Box>
      </CardActionArea>
    </Box>
  );
};

export default UserCard;
