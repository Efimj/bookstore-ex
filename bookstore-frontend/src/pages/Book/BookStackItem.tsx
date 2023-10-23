import { Box, Typography } from "@mui/material";
import { ReactNode, FC } from "react";

export interface IBookStackItem {
  title: ReactNode;
  description: string;
}

const BookStackItem: FC<IBookStackItem> = ({ title, description }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {title}
      <Typography variant="body2" color="text.secondary" whiteSpace="nowrap">
        {description}
      </Typography>
    </Box>
  );
};

export default BookStackItem;
