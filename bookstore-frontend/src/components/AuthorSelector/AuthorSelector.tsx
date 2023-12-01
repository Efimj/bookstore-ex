import { Autocomplete, Avatar, Box, Chip, TextField } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import IUser from "../../interfaces/IAuthor";
import { getAuthorsByEmail } from "../../api/book";

export interface IAuthorSelector {
  selectedAuthors: IUser[];
  onChange: (selectedAuthors: IUser[]) => void;
}

const AuthorSelector: FC<IAuthorSelector> = ({ selectedAuthors, onChange }) => {
  const [foundAuthors, setFoundAuthors] = useState<IUser[]>([]);
  const [timer, setTimer] = useState<number | null>(null);
  const [text, setText] = useState<string>("");
  const maxAuthors = 5;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
  };

  useEffect(() => {
    if (text.length === 0) {
      setFoundAuthors([]);
      if (timer) {
        clearTimeout(timer);
      }
      return
    }

    const newTimer = window.setTimeout(async () => {
      const newAuthors = await getAuthorsByEmail(text, 0, maxAuthors);
      setFoundAuthors(newAuthors);
    }, 500);
    setTimer(newTimer);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [text]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Autocomplete
        multiple
        size="medium"
        fullWidth
        options={foundAuthors}
        getOptionLabel={(option) => option.email}
        //defaultValue={[foundAuthors]}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Authors"
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option.email}
              size="medium"
              avatar={<Avatar alt="Author" src={option.image} />}
              {...getTagProps({ index })}
            />
          ))
        }
      />
    </Box>
  );
};

export default AuthorSelector;
