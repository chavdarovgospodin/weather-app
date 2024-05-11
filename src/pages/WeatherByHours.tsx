import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { WeatherList } from '../components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const WeatherByHours = () => {
  const { date }: any = useParams();
  const {
    weather: { fiveDaysForecastHourly },
  } = useSelector((state: any) => state.weather);

  const foundDate = fiveDaysForecastHourly?.filter((day: any) =>
    day.date.includes(date)
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
