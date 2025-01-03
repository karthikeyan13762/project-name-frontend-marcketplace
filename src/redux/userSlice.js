// write know user data is available in protected route this is notwhat we want, user data is should available accross the application so wehave to use slice concept cpy paste loaderslice loader shold replace with users

import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },

  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { SetUser } = usersSlice.actions;

//go to the store.js
