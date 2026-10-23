import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./slices/ListSlice";
import userReducer from "./slices/authSlice";
import listItemsReducer from "./slices/ListItemSlice";

// after creating the slice and exporting its properties, next your create the store
export const store = configureStore({
  reducer: {
    lists: listReducer,
    users: userReducer,
    listItems: listItemsReducer,
  },
});

// export these to have access to the state, and be able to make actions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
