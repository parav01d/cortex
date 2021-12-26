import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { House } from "Model";

export interface HouseState {
  isLoading: boolean,
  list: House[],
  detail: House | null,
  error: Error | null,
}

const initialState: HouseState = {
  isLoading: false,
  list: [],
  detail: null,
  error: null,
}

export const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    findHouseRequest: (state, action: PayloadAction<{ id: string }>) => {
      state.isLoading = true;
    },
    findHouseFailure: (state, action: PayloadAction<{ error: Error }>) => {
      state.error = action.payload.error;
    },
    findHouseSuccess: (state, action: PayloadAction<{ house: House }>) => {
      state.detail = action.payload.house
    },
    getHouseRequest: (state, action: PayloadAction<{ take: number, page: number }>) => {
      state.isLoading = true;
    },
    getHouseFailure: (state, action: PayloadAction<{ error: Error }>) => {
      state.error = action.payload.error;
    },
    getHouseSuccess: (state, action: PayloadAction<{ houses: House[] }>) => {
      state.list = action.payload.houses
    },
  },
})
