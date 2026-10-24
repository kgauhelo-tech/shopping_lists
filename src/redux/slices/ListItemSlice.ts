import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { ListItem } from "../../types/types";

interface listItemsState {
  items: ListItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: listItemsState = {
  items: [],
  status: "idle",
  error: null,
};

const listItemSlice = createSlice({
  name: "listItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListItems.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchListItems.rejected, (state, action) => {
        state.error = action.error.message || "Fetching list items has failed";
        state.status = "failed";
      })
      .addCase(
        fetchListItems.fulfilled,
        (state, action: PayloadAction<ListItem[]>) => {
          state.status = "succeeded";
          state.error = null;
          state.items = action.payload;
        },
      )
      .addCase(createListItem.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(createListItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create list item";
      })
      .addCase(
        createListItem.fulfilled,
        (state, action: PayloadAction<ListItem>) => {
          state.status = "succeeded";
          state.error = null;
          state.items.push(action.payload);
        },
      )
      .addCase(updateListItem.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateListItem.rejected, (state, action) => {
        state.error = action.error.message || "Error updating the list item";
        state.status = "failed";
      })
      .addCase(
        updateListItem.fulfilled,
        (state, action: PayloadAction<ListItem>) => {
          state.status = "succeeded";
          state.error = null;
          const index = state.items.findIndex(
            (item) => item.id === action.payload.id,
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        },
      )
      .addCase(deleteListItem.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(deleteListItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error deleting the list item";
      })
      .addCase(
        deleteListItem.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.error = null;
          state.items = state.items.filter(
            (item) => item.id !== action.payload,
          );
        },
      );
  },
});

const url = "http://localhost:3000/listItems";

const createListItem = createAsyncThunk(
  "listItems/createListItem",
  async (newListItem: Omit<ListItem, "id">) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newListItem),
    });

    if (!response.ok) throw new Error("Error adding new list item");

    const data: ListItem = await response.json();
    return data;
  },
);

const fetchListItems = createAsyncThunk(
  "listItems/fetchListItems",
  async (listId: string) => {
    const response = await fetch(`${url}?listId=${listId}`);
    if (!response.ok) throw new Error("Failed to fetch List Items");

    const data: ListItem[] = await response.json();
    return data;
  },
);

const updateListItem = createAsyncThunk(
  "listItems/updateListItem",
  async (updatedListItem: ListItem) => {
    const response = await fetch(`${url}/${updatedListItem.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedListItem),
    });

    if (!response.ok) throw new Error("Error updating list item");

    const data: ListItem = await response.json();
    return data;
  },
);

const deleteListItem = createAsyncThunk(
  "listItems/deleteListItem",
  async (id: string) => {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Error deleting list item");

    return id;
  },
);

export default listItemSlice.reducer;
export { createListItem, fetchListItems, updateListItem, deleteListItem };
