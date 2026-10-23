import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  extraReducers: (builder) => {},
});

const createListItem = createAsyncThunk("", async () => {});
const fetchListItema = createAsyncThunk("", async () => {});
const updateListItem = createAsyncThunk("", async (id: string) => {});
const deleteListItem = createAsyncThunk("", async (id: string) => {});

export default listItemSlice.reducer;
