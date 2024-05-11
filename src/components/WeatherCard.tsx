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

const WeatherCard = (weatherData: WeatherData, isTimeShown = true) => {
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
    console.log('here', params);
    !params?.date && navigate(`/weather-by-hours/${date}`);
  };

  const headerTitle = () => (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="space-between"
      alignItems="stretch"
      sx={{ cursor: params ? 'pointer' : 'none' }}
      item
      md={12}
      onClick={handleTitleClick}
    >
      <Grid item>
        <Typography sx={{ fontSize: 20 }}>
          <Box component="span" sx={{ display: 'block' }}>
            {weekDay}
          </Box>
          <Box component="span" sx={{ display: 'block' }}>
            {formattedDate}
          </Box>
          {isTimeShown && (
            <Box component="span" sx={{ display: 'block' }}>
              {formattedTime}
            </Box>
          )}
        </Typography>
      </Grid>

      <Grid item sx={{ display: 'flex' }}>
        <Box
          component="span"
          sx={{ display: 'block', fontSize: 24, fontWeight: 'bold' }}
        >
          {temp_max}
        </Box>
        <Box
          component="span"
          sx={{ fontSize: 14, pt: '10px', pl: 0.5, color: 'gray' }}
        >
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
          avatar={<ImageList searchString={icon} />}
        />
        <CardContent sx={{ pt: 0 }}>
          <Typography
            sx={{ fontSize: 24, fontWeight: 'bold', pb: 2 }}
            color="text.secondary"
          >
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
            <Box
              gridColumn="span 6"
              sx={{
                fontSize: 16,
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(0,0,0,.15)',
                borderTopLeftRadius: '2px',
                borderTopRightRadius: '2px',
              }}
            >
              <Typography color="text.secondary">Temp</Typography>
              <Typography
                sx={{ fontWeight: 'bold' }}
                color="text.secondary"
              >{`${temp} ${units === 'metric' ? '°C' : '°F'}`}</Typography>
            </Box>
            <Box
              gridColumn="span 6"
              sx={{
                fontSize: 16,
                p: 0.5,
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(0,0,0,.15)',
                borderTopLeftRadius: '2px',
                borderTopRightRadius: '2px',
              }}
            >
              <Typography color="text.secondary">Feels like</Typography>
              <Typography sx={{ fontWeight: 'bold' }} color="text.secondary">
                {feels_like}
                {`${units === 'metric' ? '°C' : '°F'}`}
              </Typography>
            </Box>
            <Box
              gridColumn="span 6"
              sx={{
                fontSize: 16,
                p: 0.5,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography color="text.secondary">Wind</Typography>
              <Typography color="text.secondary" sx={{ fontWeight: 'bold' }}>
                {degreesToDirection(windDeg) + ' ' + windSpeed}
                {units === 'metric' ? ' meter/sec' : ' miles/hour'}
              </Typography>
            </Box>
            <Box
              gridColumn="span 6"
              sx={{
                fontSize: 16,
                display: 'flex',
                p: 0.5,
                justifyContent: 'space-between',
              }}
            >
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
