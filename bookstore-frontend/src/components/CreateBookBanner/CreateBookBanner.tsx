import { Card, CardActionArea, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import ImportContactsTwoToneIcon from "@mui/icons-material/ImportContactsTwoTone";

export interface ICreateBookBanner {
  onClick: () => void;
}

const CreateBookBanner: FC<ICreateBookBanner> = ({ onClick }) => {
  const theme = useTheme();

  const mainColor = theme.palette.text.primary;
  const secondaryColor = theme.palette.text.secondary;

  return (
    <Card sx={{}} elevation={0}>
      <CardActionArea
        onClick={onClick}
        id=""
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 350,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          borderRadius: 3,
          border: `2px dashed ${secondaryColor}`,
          transition: "all .2s linear",
          "& h5": { transition: "all .2s linear" },
          "&:hover": {
            borderColor: "secondary.main",
            "& h5": {
              color: theme.palette.primary.main, // Измените цвет текста на зеленый при наведении
            },
          },
          overflow: "hidden",
        }}
      >
        <ImportContactsTwoToneIcon
          sx={{
            width: "70px",
            height: "70px",
            color: secondaryColor,
          }}
        />
        <Typography
          variant="h5"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
          color={mainColor}
        >
          Publish book
        </Typography>
        <Typography
          variant="body1"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            textAlign: "center",
            paddingX: "1rem",
            paddingTop: ".5rem",
            lineHeight: "1.2rem",
          }}
          color={secondaryColor}
        >
          Click to start publishing the book
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default CreateBookBanner;
