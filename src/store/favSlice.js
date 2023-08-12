import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "fav",
  initialState: {
    favTab: [],
    Togle: false,
  },
  reducers: {
    add: (state, action) => {
      state.favTab.push(action.payload);
      state.Togle = !state.Togle;
    },
    remove: (state, action) => {
      state.favTab = state.favTab.filter(
        (item) => item.id.videoId !== action.payload
      );
      state.Togle = !state.Togle;
    },
  },
});

export const { add, remove } = favSlice.actions;
export default favSlice.reducer;
