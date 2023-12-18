import { Typography } from "@mui/material";
import { FC } from "react";
import { ICustomTypography } from "./CustomTypographyHeader";

const CustomTypographySecondaryHeader: FC<ICustomTypography> = ({
    children,
  }) => {
    return (
      <Typography
        component={"span"}
        gutterBottom
        variant="body1"
        sx={{
          width: "220px",
          marginBottom: "0",
          mt: { xs: "0rem", sm: ".5rem" },
        }}
        color="text.secondary"
        noWrap
      >
        {children}
      </Typography>
    );
  };

  export default CustomTypographySecondaryHeader;