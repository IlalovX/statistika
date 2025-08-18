import { createTheme } from "@mui/material/styles";

export const demoTheme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "none",
          whiteSpace: "nowrap",
          overflowX: "hidden",
          transition: "width 0.3s easi",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          transition: "opacity 0.3s ease, width 0.3s ease",
          overflow: "hidden",

          '[data-toolpad-collapsed="true"] &': {
            opacity: 0,
            width: 0,
            padding: 0,
          },
        },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: "dark",
    background: {
      default: "#242424",
      paper: "#2e2e2e", //#242424d
    },
  },
});
