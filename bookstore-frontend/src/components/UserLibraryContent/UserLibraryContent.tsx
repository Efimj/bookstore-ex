import { Box, Button, ButtonGroup } from "@mui/material";
import { FC, useState } from "react";
import IUser from "../../interfaces/IAuthor";
import UserLibrary from "../../pages/UserPage/UserLibrary";
import UserPublish from "../../pages/UserPage/UserPublish";
import UserWishlist from "../../pages/UserPage/UserWishlist";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";

export interface IUserLibraryContent {
  user: IUser;
}

const UserLibraryContent: FC<IUserLibraryContent> = ({ user }) => {
  const [selectedBtn, setSelectedBtn] = useState("wishlist");

  if (user === null) return;

  let userButtons = [
    {
      content: "Wishlist",
      icon: <GradeOutlinedIcon />,
      id: "wishlist",
    },
    {
      content: "Library",
      icon: <ClassOutlinedIcon />,
      id: "library",
    },
  ];

  if (user.user_type_name === "writer") {
    userButtons = [
      ...userButtons,
      {
        content: "Published",
        icon: <DrawOutlinedIcon />,
        id: "published",
      },
    ];
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ButtonGroup
        sx={{ display: "flex", width: "100%", justifyContent: "center" }}
        disableElevation
        variant="outlined"
        color="primary"
      >
        {userButtons.map((element, index) => {
          return (
            <Button
              key={index}
              sx={{ borderRadius: ".5rem" }}
              variant={selectedBtn === element.id ? "contained" : "outlined"}
              onClick={() => setSelectedBtn(element.id)}
              startIcon={element.icon}
            >
              {element.content}
            </Button>
          );
        })}
      </ButtonGroup>
      <Box sx={{ display: selectedBtn === "wishlist" ? "block" : "none" }}>
        <UserWishlist user={user} />
      </Box>
      <Box sx={{ display: selectedBtn === "library" ? "block" : "none" }}>
        <UserLibrary user={user} />
      </Box>
      <Box sx={{ display: selectedBtn === "published" ? "block" : "none" }}>
        <UserPublish user={user} />
      </Box>
    </Box>
  );
};

export default UserLibraryContent;
