import { createSlice } from '@reduxjs/toolkit';

export interface LocationState {
  latitude: string;
  longitude: string;
  isLoading: boolean;
  error: any;
}

const initialState: LocationState = {
  latitude: '',
  longitude: '',
  isLoading: false,
  error: '',
} as LocationState;

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    requestUserLocation: (state) => {
      state.isLoading = true;
    },
    setUserLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      (state.isLoading = false), (state.error = null);
    },
    setLocationError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default locationSlice.reducer;
export const { setUserLocation, setLocationError, requestUserLocation } =
  locationSlice.actions;
