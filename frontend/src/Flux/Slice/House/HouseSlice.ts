import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { House } from "Model";

export interface HouseState {
  isLoading: boolean,
  list: House[],
  total: number,
  detail: House | null,
  error: string[],
}

const initialState: HouseState = {
  isLoading: false,
  list: [],
  total: 0,
  detail: null,
  error: [],
}

export const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    findHouseRequest: (state, action: PayloadAction<{ id: string }>) => {
      console.log("Reduce:", action);
      state.detail = null;
      state.isLoading = true;
      state.error = state.error.filter((e) => e !== "house/findHouseFailure");
    },
    findHouseFailure: (state, action: PayloadAction<{ code: number, message: string }>) => {
      console.log("Reduce:", action);
      state.error = [...state.error, "house/findHouseFailure"]
    },
    findHouseSuccess: (state, action: PayloadAction<{ house: House }>) => {
      console.log("Reduce:", action);
      state.detail = action.payload.house
    },
    getHouseRequest: (state, action: PayloadAction<{ take: number, page: number }>) => {
      console.log("Reduce:", action);
      state.isLoading = true;
      state.error = state.error.filter((e) => e !== "house/getHouseFailure");
    },
    getHouseFailure: (state, action: PayloadAction<{ code: number, message: string }>) => {
      console.log("Reduce:", action);
      state.error = state.error = [...state.error, "house/getHouseFailure"];
    },
    getHouseSuccess: (state, action: PayloadAction<{ houses: House[], total: number }>) => {
      console.log("Reduce:", action);
      state.list = action.payload.houses;
      state.total = action.payload.total;
    },
  },
})
