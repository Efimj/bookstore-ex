import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

export interface IPageWrapper {
  children: ReactNode;
}

const PageWrapper: FC<IPageWrapper> = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: { xs: ".5rem", sm: "1rem", md: "2rem" },
        paddingX: { xs: ".75rem", sm: "1.25rem", md: "2rem" },
        gap: { xs: ".75rem", sm: "1rem" },
      }}
    >
      {children}
    </Box>
  );
};

export default PageWrapper;
