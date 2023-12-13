import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Typography,
  InputBase,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { NavigateBookCatalogRoute } from "../../pages/BookCatalog/BookCatalog";
import { useNavigate } from "react-router-dom";
import AuthorSelector from "../AuthorSelector/AuthorSelector";
import IUser from "../../interfaces/IAuthor";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";

export default function SearchModal() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [authors, setAuthors] = useState<IUser[]>([]);
  const [query, setQuery] = useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMore = () => {
    const queryParams = {
      query: query,
      authors: authors.map((e) => e.user_id),
    };
    const url = NavigateBookCatalogRoute(queryParams);
    navigate(url);
    handleClose();
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ color: theme.palette.text.secondary }}
      >
        <SearchIcon sx={{ marginRight: ".5rem" }}></SearchIcon>
        Search...
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        sx={{
          backdropFilter: "blur(5px) sepia(5%)",
        }}
        PaperProps={{
          sx: {
            borderRadius: "1rem",
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <Paper>
          <DialogTitle sx={{ padding: "1rem" }}>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <SearchIcon
                sx={{ color: theme.palette.text.secondary }}
              ></SearchIcon>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Book Store"
                onChange={handleQueryChange}
                value={query}
              />
            </Box>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ padding: "1rem" }}>
            <Typography
              variant="body1"
              sx={{ paddingBottom: ".1rem" }}
              color="text.secondary"
            >
              Select Authors
            </Typography>
            <AuthorSelector authors={authors} onChange={setAuthors} />
          </DialogContent>
          <DialogActions sx={{ padding: "1rem", pt: "0" }}>
            <Box sx={{ width: "100%" }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleMore}
                startIcon={<SavedSearchIcon />}
              >
                Search more
              </Button>
            </Box>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  );
}
