import React, { BaseSyntheticEvent, useState, useEffect } from 'react';
import { Button, Switch, FormGroup, FormControlLabel } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useNavigate } from 'react-router-dom';

import { LoadingScreen } from './components';
import { fetchUserLocation, fetchWeatherData } from './redux/actions';
import { AppDispatch } from './store';
import { setLocalStorageItem } from './utils';

const App = () => {
  const [metrics, setMetrics] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    latitude,
    longitude,
    isLoading: isLocationLoading,
  } = useSelector((state: any) => state.location);

  const {
    weather: { fiveDaysForecastDaily },
    isLoading: isWeatherLoading,
  } = useSelector((state: any) => state.weather);

  const handleSwitch = (event: BaseSyntheticEvent) => {
    const unitsValue = event.target.checked ? 'metric' : 'imperial';
    setLocalStorageItem('units', unitsValue);
    setMetrics(unitsValue);
    dispatch(fetchWeatherData(latitude, longitude));
  };

  const handleLocationClick = async () => {
    await dispatch(fetchUserLocation());
  };

  useEffect(() => {
    setLocalStorageItem('units', 'metric');
    setMetrics('metric');
  }, []);

  useEffect(() => {
    if (isLocationLoading) navigate(`/weather-by-days`);
  }, [isLocationLoading]);

  return (
    <div className="App">
      {(isLocationLoading || isWeatherLoading) && <LoadingScreen />}
      <header className="App-header">
        {fiveDaysForecastDaily.length === 0 ? (
          <Button
            size="large"
            variant="contained"
            sx={{ mb: 4, mt: 4 }}
            onClick={handleLocationClick}
          >
            Show weather for current location
          </Button>
        ) : (
          <FormGroup sx={{ mt: 1, mb: 2 }}>
            <FormControlLabel
              sx={{ ml: 1 }}
              control={
                <Switch
                  defaultChecked
                  onChange={handleSwitch}
                  aria-label="Metrics"
                />
              }
              label={`Units ${metrics}`}
            />
          </FormGroup>
        )}
        <Outlet />
      </header>
    </div>
  );
};

export default App;
