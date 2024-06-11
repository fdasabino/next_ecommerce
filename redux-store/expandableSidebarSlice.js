import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isExpanded: false,
};

const expandableSidebarSlice = createSlice({
  name: "expandableSidebar",
  initialState,
  reducers: {
    toggleExpandableSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
    },
  },
});

export const { toggleExpandableSidebar } = expandableSidebarSlice.actions;

export default expandableSidebarSlice.reducer;
