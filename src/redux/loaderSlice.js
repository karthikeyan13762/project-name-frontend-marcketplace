import { createSlice } from "@reduxjs/toolkit";
// There will be the object for the createslice in that you have to pass the intial data 1st nameis loader then intial state that have only one variable loading or isloading whaterverit is
//nowwe need controll this loading value  whenever the api request is hit or gone  thatmeans when we hit on the login weneed to controll this value by changing it to true once we get this response again we have to make this false whenever the value is true wewill shower theloader

export const loaderSlice = createSlice({
  name: "loaders",
  initialState: {
    loading: false,
  },
  //   in the reduser iam goingto have a method to controll the value of the loading that is setloader, we will send inthe set loader weather is is true or false

  reducers: {
    SetLoader: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// you have toexport this set loader function along with the loadeslice

export const { SetLoader } = loaderSlice.actions;

// to create the store we need to loaderslice to acces this function we need to export
