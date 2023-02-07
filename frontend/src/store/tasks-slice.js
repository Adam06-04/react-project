import { createSlice } from "@reduxjs/toolkit";

const preloadedState = () => {
  try {
    const serialisedState = localStorage.getItem("tasks");
    if (serialisedState === null) return { tasks: [] };
    return { tasks: JSON.parse(serialisedState) };
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const initialState = preloadedState();

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add(state, action) {
      state.tasks.push(action.payload);
    },

    remove(state, action) {
      state.tasks = state.tasks.filter(
        (value, index) => index !== action.payload
      );
    },

    edit(state, action) {
      state.tasks[action.payload.id].title = action.payload.title;
      state.tasks[action.payload.id].description = action.payload.description;
    },
  },
});

export default tasksSlice;
