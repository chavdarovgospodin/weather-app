import { createSlice } from '@reduxjs/toolkit';

export interface WeatherState {
  weather: {
    fiveDaysForecastDaily: Array<any>;
    fiveDaysForecastHourly: Array<any>;
  };
  isLoading: boolean;
  error: any;
}

const initialState: WeatherState = {
  weather: {
    fiveDaysForecastDaily: [],
    fiveDaysForecastHourly: [],
  },
  isLoading: false,
  error: '',
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    requestWeather: (state) => {
      state.isLoading = true;
    },
    setWeatherSuccess: (state, action) => {
      state.weather.fiveDaysForecastDaily =
        action.payload.fiveDaysForecastDaily;
      state.weather.fiveDaysForecastHourly =
        action.payload.fiveDaysForecastHourly;
      state.isLoading = false;
      state.error = null;
    },
    setWeatherError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export default weatherSlice.reducer;
export const { setWeatherSuccess, setWeatherError, requestWeather } =
  weatherSlice.actions;
