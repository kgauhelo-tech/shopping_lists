import type { List } from "../../types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

// First define the shape of the state you're managing
interface listState {
  items: List[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Second create an initial state for the data
const initialState: listState = {
  items: [],
  status: "idle",
  error: null,
};

// Third add logic to fetch data
// first, test whether this works, then add more to make sure it retrieves data for a specific user
export const fetchLists = createAsyncThunk("lists/fetchLists", async () => {
  const response = await fetch("http://localhost:3000/lists");

  if (!response.ok) {
    throw new Error("Failed to fetch lists from JSON Server");
  }
  const data: List[] = await response.json();
  return data;
});

// Fourth create reducers for the actions that should happen to the data
export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    // Synchronous reducers go here if needed later
  },
  extraReducers: (builder) => {
    // We attach listeners for our async thunk here using builder.addCase()
    builder
      .addCase(fetchLists.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action: PayloadAction<List[]>) => {
        state.status = "succeeded";
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to retrieve data from server";
      });
  },
});

export default listsSlice.reducer;
