import type { List } from "../../types/types";
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

const url = "http://localhost:3000/lists";

// Third add logic to fetch data
// first, test whether this works, then add more to make sure it retrieves data for a specific user
export const fetchLists = createAsyncThunk("lists/fetchLists", async () => {
  const response = await fetch(url);

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
      })
      .addCase(createList.fulfilled, (state, action: PayloadAction<List>) => {
        ((state.error = null),
          (state.status = "succeeded"),
          state.items.push(action.payload));
      })
      .addCase(createList.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(createList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add data to server";
      })
      .addCase(updateList.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const createList = createAsyncThunk(
  "lists/createList",
  async (newListData: List) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newListData),
    });

    if (!response.ok) {
      throw new Error("Updating server data");
    }

    const savedList: List = await response.json();
    return savedList;
  },
);

export const updateList = createAsyncThunk(
  "lists/updateList",
  async (updatedList: List) => {
    const response = await fetch(`${url}/${updatedList.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    if (!response.ok) {
      throw new Error("Failed to update the list");
    }

    const data: List = await response.json();
    return data;
  },
);

export const deleteList = createAsyncThunk(
  "lists/deleteLists",
  async (id: string) => {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the list");
    }

    return id;
  },
);

export default listsSlice.reducer;
