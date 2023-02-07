import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
  isEdition: false,
  idToEdit: null,
  titleToEdit: "",
  descriptionToEdit: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggle(state, action) {
      //   const { isEdition, idToEdit } = action;
      state.isShow = !state.isShow;
      state.isEdition = false;
      state.idToEdit = null;
      state.titleToEdit = "";
      state.descriptionToEdit ="";
      //   if (isEdition !== undefined) {
      //     state.isEdition = !state.isEdition;
      //   }
      //   if (idToEdit !== undefined) {
      //     state.idToEdit = !state.idToEdit;
      //   }
    },
    toEdit(state, action) {
      state.isShow = true;
      state.isEdition = true;
      state.idToEdit = action.payload.id;
      state.titleToEdit = action.payload.title;
      state.descriptionToEdit =action.payload.description;
    },
  },
});

export default uiSlice;
