import { Box, Avatar, Typography } from "@mui/material";
import { stringAvatar, getFormattedDate } from "../../utils/utils";
import PageWrapper from "../PageWrapper/PageWrapper";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import IUser from "../../interfaces/IAuthor";
import { FC } from "react";


export interface IUserInformation {
    user:IUser
}

const UserInformation: FC<IUserInformation> = ({ user }) => {
  return <PageWrapper>
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
  </PageWrapper>;
}

export default UserInformation