import { Dispatch } from '@reduxjs/toolkit';
import { getAverageValues, getLocalStorageItem } from '../utils';
import {
  setLocationError,
  setUserLocation,
  requestUserLocation,
} from './locationSlice';
import {
  setWeatherError,
  setWeatherSuccess,
  requestWeather,
} from './weatherSlice';

export const fetchWeatherData =
  (latitude: number, longitude: number) => async (dispatch: Dispatch) => {
    dispatch(requestWeather());
    try {
      const fetchData = async (url: string) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return await response.json();
      };

      const units = getLocalStorageItem('units');
      const urls = [
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1ab8fcd2e02a9883c9ac3d84d063e8cf&units=${units}`,
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=1ab8fcd2e02a9883c9ac3d84d063e8cf&units=${units}`,
      ];

      const [currentWeather, fiveDaysWeather] = await Promise.all(
        urls.map((url) => fetchData(url)),
      );

      const data = getAverageValues(currentWeather, fiveDaysWeather.list);

      dispatch(setWeatherSuccess(data));
    } catch (error) {
      dispatch(setWeatherError(error));
    }
  };

export const fetchUserLocation = () => (dispatch: any) => {
  dispatch(requestUserLocation());
  navigator.geolocation.getCurrentPosition(
    (position) => {
      dispatch(
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      );
      dispatch(
        fetchWeatherData(position.coords.latitude, position.coords.longitude),
      );
    },
    (error) => {
      dispatch(setLocationError(error.message));
    },
  );
};
