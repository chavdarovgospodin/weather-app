import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { WeatherList } from '../components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store';

const WeatherByHours = () => {
  const { date } = useParams();
  const {
    weather: { fiveDaysForecastHourly },
  } = useSelector((state: RootState) => state.weather);

  const foundDate = fiveDaysForecastHourly?.filter(
    (day: { date: string }) => date && day.date.includes(date)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <WeatherList weather={foundDate} />
    </Container>
  );
};

export default WeatherByHours;
