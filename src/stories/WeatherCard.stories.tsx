import React from 'react';
import { StoryFn } from '@storybook/react';
import { WeatherCard } from '../components';
import { WeatherData } from '../components/WeatherList';

export default {
  title: 'WeatherCard',
  component: WeatherCard,
};

const Template: StoryFn<WeatherData> = (args) => <WeatherCard {...args} />;

export const Card = Template.bind({});
Card.args = {
  date: '2024-05-11 18:00:00',
  description: 'clear sky',
  feels_like: 16.8,
  humidity: 45,
  icon: '01n',
  pressure: 1017,
  temp_max: 18.2,
  temp_min: 9.3,
  temp: 17.4,
  windDeg: 74.0,
  windSpeed: 1.53,
};
