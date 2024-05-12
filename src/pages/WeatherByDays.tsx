import React from 'react';
import { Container } from '@mui/material';
import { WeatherList } from '../components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const WeatherByDays = () => {
  const {
    weather: { fiveDaysForecastDaily },
  } = useSelector((state: RootState) => state.weather);

  return (
    <Container>
      <WeatherList weather={fiveDaysForecastDaily} />
    </Container>
  );
};

export default WeatherByDays;
