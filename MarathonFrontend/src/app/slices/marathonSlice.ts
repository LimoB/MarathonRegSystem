import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMarathons,
  getMarathonById,
  createMarathon,
  updateMarathon,
  deleteMarathon,
  type Marathon,
} from "../../api/marathons";

// STATE TYPE
interface MarathonState {
  marathons: Marathon[];
  selectedMarathon: Marathon | null;
  loading: boolean;
  error: string | null;
}

// INITIAL STATE
const initialState: MarathonState = {
  marathons: [],
  selectedMarathon: null,
  loading: false,
  error: null,
};

//////////////////////////////////////////////////////
// 🔄 THUNKS
//////////////////////////////////////////////////////

// GET ALL
export const fetchMarathons = createAsyncThunk(
  "marathons/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getMarathons();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch marathons"
      );
    }
  }
);

// GET ONE
export const fetchMarathonById = createAsyncThunk(
  "marathons/fetchOne",
  async (id: number, thunkAPI) => {
    try {
      return await getMarathonById(id);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch marathon"
      );
    }
  }
);

// CREATE
export const addMarathon = createAsyncThunk(
  "marathons/create",
  async (data: any, thunkAPI) => {
    try {
      return await createMarathon(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create marathon"
      );
    }
  }
);

// UPDATE
export const editMarathon = createAsyncThunk(
  "marathons/update",
  async ({ id, data }: { id: number; data: any }, thunkAPI) => {
    try {
      return await updateMarathon(id, data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update marathon"
      );
    }
  }
);

// DELETE
export const removeMarathon = createAsyncThunk(
  "marathons/delete",
  async (id: number, thunkAPI) => {
    try {
      await deleteMarathon(id);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete marathon"
      );
    }
  }
);

//////////////////////////////////////////////////////
// 🧠 SLICE
//////////////////////////////////////////////////////

const marathonSlice = createSlice({
  name: "marathons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH ALL
      .addCase(fetchMarathons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarathons.fulfilled, (state, action) => {
        state.loading = false;
        state.marathons = action.payload;
      })
      .addCase(fetchMarathons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH ONE
      .addCase(fetchMarathonById.fulfilled, (state, action) => {
        state.selectedMarathon = action.payload;
      })

      // CREATE
      .addCase(addMarathon.fulfilled, (state, action) => {
        state.marathons.unshift(action.payload.marathon);
      })

      // DELETE
      .addCase(removeMarathon.fulfilled, (state, action) => {
        state.marathons = state.marathons.filter(
          (m) => m.id !== action.payload
        );
      });
  },
});

export default marathonSlice.reducer;