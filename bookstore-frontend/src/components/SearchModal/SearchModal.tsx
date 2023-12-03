import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  useTheme,
  Autocomplete,
  Chip,
  Typography,
  IconButton,
  InputBase,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <DialogTitle>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <SearchIcon
                sx={{ color: theme.palette.text.secondary }}
              ></SearchIcon>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Book Store"
              />
            </Box>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Typography variant="h6" sx={{ paddingBottom: ".3rem" }}>
              Select Authors
            </Typography>
            <Autocomplete
              multiple
              size="medium"
              options={top100Films}
              getOptionLabel={(option) => option.name}
              defaultValue={[top100Films[3]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Authors"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option.name}
                    sx={{ borderRadius: "5px" }}
                    size="medium"
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
          </DialogContent>
          {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
        </Paper>
      </Dialog>
    </div>
  );
}

const top100Films = [
  { name: "The Shawshank Redemption" },
  { name: "The Godfather" },
  { name: "The Godfather: Part II" },
  { name: "The Dark Knight" },
  { name: "Eternal Sunshine of the Spotless Mind" },
  { name: "Monty Python and the Holy Grail" },
];
