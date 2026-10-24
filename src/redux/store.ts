import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./slices/ListSlice";
import userReducer from "./slices/authSlice";
import listItemsReducer from "./slices/ListItemSlice";

export const store = configureStore({
  reducer: {
    lists: listReducer,
    users: userReducer,
    listItems: listItemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
