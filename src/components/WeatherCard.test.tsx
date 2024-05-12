import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';

import { Wrapper } from '../App.test';

describe('WeatherCard', () => {
  test('renders WeatherCard component with correct values', () => {
    const mockProps = {
      temp: 20,
      units: 'metric',
      feels_like: 18,
      windDeg: 90,
      windSpeed: 5,
      pressure: 1013,
      date: '2022/10/05 17:55',
      description: 'Cloudy',
      humidity: 25,
      temp_max: 15.2,
      temp_min: 10.3,
    };

    render(Wrapper(<WeatherCard {...mockProps} />));

    expect(screen.getByText(`${mockProps.temp} °C`)).toBeInTheDocument();
    expect(screen.getByText(`Feels like`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProps.feels_like}°C`)).toBeInTheDocument();
    expect(screen.getByText(`Wind`)).toBeInTheDocument();
    expect(
      screen.getByText(`E ${mockProps.windSpeed} meter/sec`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Pressure`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProps.pressure} hPa`)).toBeInTheDocument();
    expect(screen.getByText(`Wed`)).toBeInTheDocument();
    expect(screen.getByText(`10/05`)).toBeInTheDocument();
    expect(screen.getByText(`17:55 PM`)).toBeInTheDocument();
    expect(screen.getByText(`/${mockProps.temp_min} °C`)).toBeInTheDocument();
    expect(screen.getByText(`Cloudy`)).toBeInTheDocument();
  });
});
