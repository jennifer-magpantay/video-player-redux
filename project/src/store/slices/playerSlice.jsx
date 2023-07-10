import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/axios";

// get data from api
// implementation by createAsyncThunk
// const fetchCourseData = createAsyncThunk("", fetchFunction)
export const loadCourseData = createAsyncThunk("player/load", async () => {
  const response = await api.get("/course");
  // console.log(response.data);
  return response.data;
});

const playerSlice = createSlice({
  name: "player",
  initialState: {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isDataLoading: false,
  },
  reducers: {
    start: (state, action) => {
      state.course = action.payload;
    },
    play: (state, action) => {
      state.currentModuleIndex = action.payload[0];
      state.currentLessonIndex = action.payload[1];
    },
  },
  // set a builder and function for the thunk
  extraReducers(builder) {
    builder.addCase(loadCourseData.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isDataLoading = false;
    });

    builder.addCase(loadCourseData.pending, (state) => {
      state.isDataLoading = true;
    });
  },
});

export const player = playerSlice.reducer;
export const { play, start } = playerSlice.actions;
