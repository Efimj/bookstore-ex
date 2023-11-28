import {
  Box,
  Button,
  ButtonGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import IUser from "../../interfaces/IAuthor";
import UserLibrary from "../../pages/UserPage/UserLibrary";
import UserPublish from "../../pages/UserPage/UserPublish";
import UserWishlist from "../../pages/UserPage/UserWishlist";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import { useNavigate, useParams } from "react-router-dom";

export interface IUserLibraryContent {
  user: IUser;
  showCreateBook?: boolean;
}

const UserLibraryContent: FC<IUserLibraryContent> = ({
  user,
  showCreateBook = false,
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const [selectedBtn, setSelectedBtn] = useState("library");
  const theme = useTheme();
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
 console.log(params)
  // useEffect(() => {
  //   if (
  //     params?.page !== "wishlist" &&
  //     params?.page !== "library" &&
  //     params?.page !== "published"
  //   ) {
  //     console.log(1);
  //     navigate("library/library");
  //   } else {
  //     console.log(2);
  //     setSelectedBtn(params.page);
  //     navigate(`library/${selectedBtn}`);
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log(3);
  //   navigate(`library/${selectedBtn}`);
  // }, [selectedBtn]);

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
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          flexDirection: { xs: "column", sm: "row" },
        }}
        disableElevation
        orientation={lessThanSmall ? "vertical" : "horizontal"}
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
        <UserPublish user={user} showCreateBook={showCreateBook} />
      </Box>
    </Box>
  );
};

export default UserLibraryContent;
