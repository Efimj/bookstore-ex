import { FormControl } from "@mui/material";
import { FC } from "react";

export interface ICustomFormControl {
  children: React.ReactNode;
}

const CustomFormControl: FC<ICustomFormControl> = ({ children }) => {
  return (
    <FormControl
      defaultValue=""
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: ".5rem", sm: "1.5rem" },
      }}
      required
    >
      {children}
    </FormControl>
  );
};

export default CustomFormControl;
