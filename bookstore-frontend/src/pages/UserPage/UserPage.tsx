import { Avatar, Box, Button, ButtonGroup, Typography } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IUser from "../../interfaces/IAuthor";
import { getUser } from "../../api/user";
import { getFormattedDate, stringAvatar } from "../../utils/utils";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import UserWishlist from "./UserWishlist";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import UserLibrary from "./UserLibrary";
import UserPublish from "./UserPublish";

export interface IUserPage {}

const UserPage: FC<IUserPage> = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [selectedBtn, setSelectedBtn] = useState("wishlist");
  console.log(user)

  useEffect(() => {
    async function get() {
      if (!userId) return;
      let response = await getUser(userId);
      if (response !== null) setUser(response);
    }
    get();
  }, []);

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
    <PageWrapper>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Avatar
          {...(user.image && { alt: user.first_name, src: user.image })}
          {...(!user.image && stringAvatar(user.first_name, user.last_name))}
          sx={{
            width: { xs: "120px", sm: "140px", md: "170px" },
            height: { xs: "120px", sm: "140px", md: "170px" },
            fontSize: { xs: "3rem", sm: "3.5rem", md: "4rem" },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Typography
            gutterBottom
            variant="h4"
            noWrap
            sx={{
              textOverflow: "ellipsis",
              marginBottom: ".5rem",
            }}
          >
            {`${user.first_name} ${user.last_name}`}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            noWrap
            sx={{
              textOverflow: "ellipsis",
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              marginBottom: ".1rem",
            }}
          >
            <EmailOutlinedIcon></EmailOutlinedIcon>
            {user.email}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            noWrap
            sx={{
              textOverflow: "ellipsis",
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              marginBottom: ".1rem",
            }}
          >
            <InsertInvitationOutlinedIcon></InsertInvitationOutlinedIcon>
            {getFormattedDate(new Date(user.created_at))}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            noWrap
            sx={{
              textOverflow: "ellipsis",
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              marginBottom: ".1rem",
            }}
          >
            <PermIdentityOutlinedIcon></PermIdentityOutlinedIcon>
            {user.user_type_name}
          </Typography>
        </Box>
      </Box>
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
    </PageWrapper>
  );
};

export default UserPage;
