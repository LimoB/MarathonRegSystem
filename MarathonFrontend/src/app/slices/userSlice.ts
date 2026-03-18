import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateProfile,
  type User,
} from "../../api/users";

interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

//////////////////////////////////////////////////////
// 🔄 THUNKS
//////////////////////////////////////////////////////

// ADMIN THUNKS
export const fetchUsers = createAsyncThunk("users/fetchAll", async (_, thunkAPI) => {
  try {
    return await getUsers();
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch users");
  }
});

export const fetchUser = createAsyncThunk("users/fetchOne", async (id: number, thunkAPI) => {
  try {
    return await getUserById(id);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch user");
  }
});

export const addUser = createAsyncThunk(
  "users/add",
  async (user: Partial<User> & { password_hash: string }, thunkAPI) => {
    try {
      return await createUser(user);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to create user");
    }
  }
);

export const editUser = createAsyncThunk(
  "users/edit",
  async ({ id, updates }: { id: number; updates: Partial<User> & { password_hash?: string } }, thunkAPI) => {
    try {
      const message = await updateUser(id, updates);
      return { id, updates, message };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update user");
    }
  }
);

export const removeUser = createAsyncThunk("users/delete", async (id: number, thunkAPI) => {
  try {
    const message = await deleteUser(id);
    return { id, message };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete user");
  }
});

// ATHLETE PROFILE
export const updateMyProfile = createAsyncThunk(
  "users/updateProfile",
  async (updates: Partial<User> & { password_hash?: string }, thunkAPI) => {
    try {
      const message = await updateProfile(updates);
      return { updates, message };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update profile");
    }
  }
);

//////////////////////////////////////////////////////
// 🧠 SLICE
//////////////////////////////////////////////////////

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH USERS
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH USER BY ID
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ADD USER
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.unshift(action.payload);
      })

      // EDIT USER
      .addCase(editUser.fulfilled, (state, action) => {
        state.users = state.users.map((u) =>
          u.id === action.payload.id ? { ...u, ...action.payload.updates } : u
        );
      })

      // DELETE USER
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload.id);
      })

      // UPDATE PROFILE
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        if (state.selectedUser) state.selectedUser = { ...state.selectedUser, ...action.payload.updates };
      });
  },
});

export default userSlice.reducer;