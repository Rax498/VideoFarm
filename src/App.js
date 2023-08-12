import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { orange, deepOrange, grey } from "@mui/material/colors";
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
  const [darkmode, setDarkmode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkmode ? "light" : "dark",
      background: {
        paper: darkmode ? grey[200] : "#000000 ",
        default: darkmode ? grey[300] : "#000000 ",
      },
      primary: {
        main: darkmode ? "#000000" : orange[400],
        light: darkmode ? "#000000" : deepOrange[50],
        dark: darkmode ? "#000000" : orange[600],
      },
    },
  });

  const modechange = () => {
    setDarkmode((prevDarkmode) => !prevDarkmode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Navbar modechange={modechange} darkmode={darkmode} />
        <Routes>
          <Route path="/" exact element={<Feed />} />
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
