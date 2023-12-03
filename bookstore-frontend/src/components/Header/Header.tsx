import { Toolbar, Typography, Box, Paper, CardActionArea } from "@mui/material";
import NavigationBar from "../NavigationBar/NavigationBar";
import SearchModal from "../SearchModal/SearchModal";
import { useNavigate } from "react-router-dom";
import AccountMenu from "../AccountMenu/AccountMenu";

export interface IAppHeader {}

export default function Header(props: IAppHeader) {
  const navigate = useNavigate();

  return (
    <Paper elevation={0} sx={{ borderRadius: 0 }}>
      <Toolbar style={{ height: 72 }}>
        <CardActionArea
          sx={{
            overflow: "visible",
            alignItems: "center",
            margin: 0,
            display: { xs: "flex", sm: "none", md: "flex" },
            cursor: "pointer",
            height: "100%",
            width: "fit-content",
          }}
          onClick={() => navigate("/")}
        >
          <Typography
            gutterBottom
            variant="h5"
            sx={{ marginBottom: "0" }}
            color="text.secondary"
            noWrap
          >
            Book Store
          </Typography>
        </CardActionArea>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NavigationBar />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
            gap: "1rem",
          }}
        >
          <SearchModal></SearchModal>
          <AccountMenu></AccountMenu>
        </Box>
      </Toolbar>
    </Paper>
  );
}
