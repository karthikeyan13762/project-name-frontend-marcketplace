import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loaderSlice";
import { usersSlice } from "./userSlice";

const store = configureStore({
  reducer: {
    loaders: loaderSlice.reducer, //from the slice weneed to extract the reduser
    users: usersSlice.reducer, // go to the prortceted route
  },
});

export default store; //As i say  this data should accessibel to all the componenets and all the pages so it has be either in the app.js or index.js we use index.js
