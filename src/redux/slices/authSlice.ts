import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { user } from "../../types/types";

interface userState {
  users: user[];
  activeUserId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: userState = {
  users: [],
  activeUserId: null,
  status: "idle",
  error: null,
};

const url = "http://localhost:3000/users";

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<string | null>) => {
      state.activeUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //for fetching the users list
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<user[]>) => {
        state.users = action.payload;
        state.error = null;
        state.status = "succeeded";
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message || "Error fetching users";
        state.status = "failed";
      })

      // for adding a new user
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add user";
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<user>) => {
        state.error = null;
        state.status = "succeeded";
        state.users.push(action.payload);
      })

      // for updating a user's data
      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update data";
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<user>) => {
        state.status = "succeeded";
        state.error = null;
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      // for deleting a user
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete the user";
      })
      .addCase(deleteUser.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.error = null;
        state.status = "succeeded";
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(url);

  if (!response.ok) throw new Error("Error fetching users");

  const data: user[] = await response.json();
  return data;
});
const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser: user) => {
    const response = await fetch(`${url}/${updatedUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    const data = await response.json();
    return data;
  },
);
const addUser = createAsyncThunk("users/addUser", async (newUser: user) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) throw new Error("Error creating user profile");

  const data = await response.json();
  return data;
});
const deleteUser = createAsyncThunk("users/deleteUser", async (id: string) => {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Error deleting user");

  return id;
});

export const { setActiveUser } = usersSlice.actions;
export default usersSlice.reducer;
export { fetchUsers, addUser, updateUser, deleteUser };
