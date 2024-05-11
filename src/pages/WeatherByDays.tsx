import React from 'react';
import { Container } from '@mui/material';
import { WeatherList } from '../components';
import { useSelector } from 'react-redux';

const WeatherByDays = () => {
  const {
    weather: { fiveDaysForecastDaily },
  } = useSelector((state: any) => state.weather);

  return (
    <Container>
      <WeatherList weather={fiveDaysForecastDaily} />
    </Container>
  );
};

export default WeatherByDays;
