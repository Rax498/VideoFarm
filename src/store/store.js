import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./favSlice";

const store = configureStore({
  reducer: {
    fav: favReducer,
  },
});
export default store;
