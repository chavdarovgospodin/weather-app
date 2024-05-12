import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  CardHeader,
  Typography,
  Box,
} from '@mui/material';
import { ImageList } from '.';
import {
  degreesToDirection,
  getDateValues,
  getLocalStorageItem,
} from '../utils';
import { useTheme } from '@mui/material/styles';
import { WeatherData } from './WeatherList';
import { useParams, useNavigate } from 'react-router-dom';

import './styles.css';

const WeatherCard = (weatherData: WeatherData) => {
  const {
    date,
    description,
    feels_like,
    humidity,
    icon,
    pressure,
    temp_max,
    temp_min,
    temp,
    windDeg,
    windSpeed,
  } = weatherData;
  const units = getLocalStorageItem('units');
  const { weekDay, formattedDate, formattedTime } = getDateValues(date);
  const theme = useTheme();
  const params = useParams();
  const navigate = useNavigate();

  const handleTitleClick = () => {
    !params?.date && navigate(`/weather-by-hours/${date}`);
  };

  const headerTitle = () => (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="space-between"
      alignItems="stretch"
      sx={{ cursor: !params?.date ? 'pointer' : 'default' }}
      item
      md={12}
      onClick={handleTitleClick}
    >
      <Grid item>
        <Typography className="Header-title">
          <Box component="span" className="Header-title-date">
            {weekDay}
          </Box>
          <Box component="span" className="Header-title-date">
            {formattedDate}
          </Box>
          <Box component="span" className="Header-title-date">
            {formattedTime}
          </Box>
        </Typography>
      </Grid>

      <Grid item sx={{ display: 'flex' }}>
        <Box component="span" className="Temp-max">
          {temp_max}
        </Box>
        <Box component="span" className="Temp-min">
          /{temp_min} {`${units === 'metric' ? '°C' : '°F'}`}
        </Box>
      </Grid>
      <Grid item>
        <Typography sx={{ fontSize: 22 }}>{humidity}%</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Grid item xs={12} sm={8} md={8}>
      <Card variant="outlined">
        <CardHeader
          title={headerTitle()}
          sx={{ pb: 0 }}
          avatar={icon && <ImageList searchString={icon} />}
        />
        <CardContent sx={{ pt: 0 }}>
          <Typography className="Description" color="text.secondary">
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={4}
            sx={{
              [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
                display: 'flex',
                flexDirection: 'column',
              },
            }}
          >
            <Box gridColumn="span 6" className="Temp">
              <Typography color="text.secondary">Temp</Typography>
              <Typography
                sx={{ fontWeight: 'bold' }}
                color="text.secondary"
              >{`${temp} ${units === 'metric' ? '°C' : '°F'}`}</Typography>
            </Box>
            <Box gridColumn="span 6" className="Feels-like">
              <Typography color="text.secondary">Feels like</Typography>
              <Typography sx={{ fontWeight: 'bold' }} color="text.secondary">
                {feels_like}
                {`${units === 'metric' ? '°C' : '°F'}`}
              </Typography>
            </Box>
            <Box gridColumn="span 6" className="Wind">
              <Typography color="text.secondary">Wind</Typography>
              <Typography color="text.secondary" sx={{ fontWeight: 'bold' }}>
                {degreesToDirection(windDeg) + ' ' + windSpeed}
                {units === 'metric' ? ' meter/sec' : ' miles/hour'}
              </Typography>
            </Box>
            <Box gridColumn="span 6" className="Pressure">
              <Typography color="text.secondary">Pressure</Typography>
              <Typography sx={{ fontWeight: 'bold' }} color="text.secondary">
                {pressure} hPa
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WeatherCard;
