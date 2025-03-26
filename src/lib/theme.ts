// src/lib/theme.ts
import { createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";

// Load Inter font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Choose weights you need
});

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export default theme;
