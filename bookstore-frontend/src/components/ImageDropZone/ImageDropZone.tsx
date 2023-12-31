import { Box, Button, CardMedia, Typography, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import LandscapeTwoToneIcon from "@mui/icons-material/LandscapeTwoTone";

export interface IImageDropZone {
  label?: string;
  description?: string;
  value?: File | null;
  disabled?: boolean;
  onChange: (file: File) => void;
}

const ImageDropZone: FC<IImageDropZone> = ({
  label = "Drag 'n' drop some files here, or click to select files",
  description = "The picture for the description must be in PNG or JPEG format and with a resolution of 1024 x 500 pixels. File size – no more than 15 MB.",
  value = null,
  disabled = false,
  onChange,
}) => {
  const theme = useTheme();
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);

  useEffect(() => {
    if (value === null) return;
    setFiles([
      Object.assign(value, {
        preview: URL.createObjectURL(value),
      }),
    ]);
  }, [value]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    disabled: disabled,
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      onChange(acceptedFiles[0]);
    },
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Box
        sx={
          disabled
            ? {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
                gap: ".5rem",
                height: "220px",
                borderRadius: ".65rem",
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[800]
                    : theme.palette.grey[400]
                }`,
              }
            : {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
                gap: ".5rem",
                height: "220px",
                borderRadius: ".65rem",
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[800]
                    : theme.palette.grey[400]
                }`,
                ":hover": {
                  border: `1px solid ${theme.palette.secondary.main}`,
                },
                cursor: "pointer",
              }
        }
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        {files.length > 0 &&
          files.map((file, index) => (
            <Box
              key={index}
              sx={{
                height: "220px",
                width: "150px",
                overflow: "hidden",
                border: "1px solid transparent",
                borderRadius: "1rem",
                m: ".5rem",
              }}
            >
              <CardMedia
                component="img"
                alt="451 degrees Fahrenheit.jpeg"
                sx={{
                  padding: 0,
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                image={file.preview}
              />
            </Box>
          ))}

        {files.length === 0 && (
          <>
            <LandscapeTwoToneIcon
              sx={{
                width: "80px",
                height: "80px",
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[800]
                    : theme.palette.grey[300],
              }}
            />
            <Typography variant="body2">{label}</Typography>
            <Button
              variant="text"
              sx={{ fontWeight: "600" }}
              startIcon={<FileUploadOutlinedIcon />}
            >
              Upload
            </Button>
          </>
        )}
      </Box>
      <Typography
        variant="body2"
        sx={{ pt: ".25rem", fontSize: ".75rem", pr: "1rem", pl: "1rem" }}
        color="text.secondary"
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ImageDropZone;
