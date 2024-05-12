import React from 'react';
import { Box, Grid } from '@mui/material';
import { WeatherCard } from '.';

export interface WeatherData {
  date: string;
  description: string;
  feels_like: number;
  humidity: number;
  icon?: string;
  pressure: number;
  temp_max: number;
  temp_min: number;
  temp: number;
  windDeg: number;
  windSpeed: number;
}

const WeatherList = ({ weather }: { weather: WeatherData[] }) => (
  <Box sx={{ flexGrow: 1 }}>
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="stretch"
    >
      {weather.map((el: WeatherData, index: number) => (
        <WeatherCard {...el} key={index} />
      ))}
    </Grid>
  </Box>
);

export default WeatherList;
