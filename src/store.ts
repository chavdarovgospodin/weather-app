import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './redux/weatherSlice';
import locationReducer from './redux/locationSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
