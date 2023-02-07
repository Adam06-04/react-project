import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasks-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: { tasks: tasksSlice.reducer, ui: uiSlice.reducer }
});

export const tasksActions = tasksSlice.actions;
export const uiActions = uiSlice.actions;

export default store;
