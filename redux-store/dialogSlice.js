import { createSlice } from "@reduxjs/toolkit";

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    show: true,
    header: "",
    msgs: [
      {
        msg: "",
        type: "",
      },
    ],
    link: {
      link: "",
      link_text: "",
    },
  },
  reducers: {
    showDialog: (state, action) => {
      state.show = true;
      state.header = action.payload.header;
      state.msgs = action.payload.msgs;
      state.link = action.payload.link;
    },

    hideDialog: (state) => {
      state.show = false;
      state.header = "";
      state.msgs = [];
      state.link = {};
    },
  },
});

export const { showDialog, hideDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
