import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerForMarathon,
  getMyRegistrations,
  getRegistrations,
  updateRegistration,
  deleteRegistration,
  type Registration,
} from "../../api/registrations";

// STATE TYPE
interface RegistrationState {
  registrations: Registration[];
  myRegistrations: Registration[];
  loading: boolean;
  error: string | null;
}

const initialState: RegistrationState = {
  registrations: [],
  myRegistrations: [],
  loading: false,
  error: null,
};

//////////////////////////////////////////////////////
// 🔄 THUNKS
//////////////////////////////////////////////////////

// REGISTER (ATHLETE)
export const createRegistration = createAsyncThunk(
  "registrations/create",
  async (data: { marathon_id: number; category: string }, thunkAPI) => {
    try {
      return await registerForMarathon(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// GET MY REGISTRATIONS (ATHLETE)
export const fetchMyRegistrations = createAsyncThunk(
  "registrations/fetchMine",
  async (_, thunkAPI) => {
    try {
      return await getMyRegistrations();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch your registrations"
      );
    }
  }
);

// GET ALL REGISTRATIONS (ADMIN)
export const fetchRegistrations = createAsyncThunk(
  "registrations/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getRegistrations();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch registrations"
      );
    }
  }
);

// UPDATE (ADMIN)
export const editRegistration = createAsyncThunk(
  "registrations/update",
  async (
    { id, data }: { id: number; data: any },
    thunkAPI
  ) => {
    try {
      return await updateRegistration(id, data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update registration"
      );
    }
  }
);

// DELETE (ADMIN)
export const removeRegistration = createAsyncThunk(
  "registrations/delete",
  async (id: number, thunkAPI) => {
    try {
      await deleteRegistration(id);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete registration"
      );
    }
  }
);

//////////////////////////////////////////////////////
// 🧠 SLICE
//////////////////////////////////////////////////////

const registrationSlice = createSlice({
  name: "registrations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.myRegistrations.unshift(action.payload.registration);
      })
      .addCase(createRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH MY REGISTRATIONS
      .addCase(fetchMyRegistrations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyRegistrations.fulfilled, (state, action) => {
        state.loading = false;
        state.myRegistrations = action.payload;
      })
      .addCase(fetchMyRegistrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH ALL REGISTRATIONS (ADMIN)
      .addCase(fetchRegistrations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegistrations.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations = action.payload;
      })
      .addCase(fetchRegistrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(removeRegistration.fulfilled, (state, action) => {
        state.registrations = state.registrations.filter(
          (r) => r.id !== action.payload
        );
        state.myRegistrations = state.myRegistrations.filter(
          (r) => r.id !== action.payload
        );
      });
  },
});

export default registrationSlice.reducer;