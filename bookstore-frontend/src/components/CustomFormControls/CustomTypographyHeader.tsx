import { Typography } from "@mui/material";
import { FC } from "react";

export interface ICustomTypography {
  children: string;
}

const CustomTypographyHeader: FC<ICustomTypography> = ({ children }) => {
  return (
    <Typography
      component={"span"}
      gutterBottom
      variant="h5"
      sx={{
        marginBottom: "0",
        mt: ".5rem",
      }}
      noWrap
    >
      {children}
    </Typography>
  );
};

export default CustomTypographyHeader;
