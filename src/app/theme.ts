import { createTheme } from "@mui/material/styles";

export const materialTheme = createTheme({
  palette: {
    primary: {
      main: "#E62629",
    },
    secondary: {
      main: "#6c757d",
    },
    success: {
      main: "#28a745",
    },
    error: {
      main: "#dc3545",
    },
    warning: {
      main: "#ffc107",
    },
    info: {
      main: "#17a2b8",
    },
    background: {
      default: "#f8f9fa",
      paper: "#fff",
    },
    text: {
      primary: "#212529",
      secondary: "#f8f9fa",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
});
