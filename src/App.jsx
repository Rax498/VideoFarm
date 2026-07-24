import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";
import { Provider } from "react-redux";
import store from "./store/store";
import {
  Navbar,
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
  Favourites,
} from "./components";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // primary.light / primary.dark double as text colors across the app
  // (video titles / channel names), so each mode sets readable values
  const theme = createTheme({
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      button: { textTransform: "none" },
    },
    shape: { borderRadius: 12 },
    palette: darkMode
      ? {
          mode: "dark",
          background: { default: "#0f0f0f", paper: "#181818" },
          primary: {
            main: orange[500],
            light: "#fff3e0",
            dark: orange[600],
          },
          divider: "rgba(255, 255, 255, 0.08)",
        }
      : {
          mode: "light",
          background: { default: "#fafafa", paper: "#ffffff" },
          primary: {
            main: orange[800],
            light: "#1f1f1f",
            dark: "#616161",
          },
          divider: "rgba(0, 0, 0, 0.1)",
        },
  });

  const modechange = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Provider store={store}>
        <Navbar
          modechange={modechange}
          darkmode={darkMode}
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
        />
        <Routes>
          <Route path="/" element={<Feed sidebarOpen={sidebarOpen} />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchterm" element={<SearchFeed />} />
          <Route path="/Favourites" element={<Favourites />} />
        </Routes>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
