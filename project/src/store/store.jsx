import { configureStore } from "@reduxjs/toolkit";
import { player } from "./slices/playerSlice";

export const store = configureStore({
  reducer: {
    //player: player
    player,
  },
});
