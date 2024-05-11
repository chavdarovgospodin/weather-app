export const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const getDateValues = (dateString: string) => {
  const date = new Date(dateString);
  const weekDay = date.toLocaleString('en-US', { weekday: 'short' });
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const amPM = date.getHours() >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours}:${minutes} ${amPM}`;
  const formattedDate = `${month}/${day}`;

  return { weekDay, formattedDate, formattedTime };
};

export const degreesToDirection = (degrees: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export const tranformWeatherValues = (
  currentWeather: any,
  fiveDaysWeather: any
) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = year + '-' + month + '-' + day;

  const fiveDaysForecastHourly = fiveDaysWeather.map((day: any) => {
    return {
      date: day.dt_txt,
      temp_min: day.main.temp_min.toFixed(1),
      temp: day.main.temp.toFixed(1),
      temp_max: day.main.temp_max.toFixed(1),
      feels_like: day.main.feels_like.toFixed(1),
      pressure: day.main.pressure.toFixed(),
      humidity: day.main.humidity.toFixed(),
      description: day.weather[0].description,
      icon: day.weather[0].icon,
      windDeg: day.wind.deg.toFixed(2),
      windSpeed: day.wind.speed,
    };
  });

  const current = {
    date: formattedDate,
    temp_min: currentWeather.main.temp_min.toFixed(1),
    temp: currentWeather.main.temp.toFixed(1),
    temp_max: currentWeather.main.temp_max.toFixed(1),
    feels_like: currentWeather.main.feels_like.toFixed(1),
    pressure: currentWeather.main.pressure.toFixed(),
    humidity: currentWeather.main.humidity.toFixed(),
    description: currentWeather.weather[0].description,
    icon: currentWeather.weather[0].icon,
    windDeg: currentWeather.wind.deg.toFixed(2),
    windSpeed: currentWeather.wind.speed,
  };

  const groupedData = fiveDaysWeather.reduce((groups: any, item: any) => {
    const date = item.dt_txt.split(' ')[0];
    groups[date] = groups[date] || [];
    groups[date].push(item);
    return groups;
  }, {});

  const fiveDaysForecastDaily = Object.entries(groupedData).map(
    ([date, group]: any) => {
      const count = group.length;
      const total = group.reduce(
        (accumulator: any, item: any) => {
          accumulator.tempMinTotal.push(item.main.temp_min);
          accumulator.tempMaxTotal.push(item.main.temp_max);
          accumulator.feelsLikeTotal += item.main.feels_like;
          accumulator.pressureTotal += item.main.pressure;
          accumulator.humidityTotal += item.main.humidity;
          accumulator.tempTotal += item.main.temp;
          accumulator.windSpeedTotal += item.wind.speed;
          accumulator.windDegTotal += item.wind.deg;

          const description = item.weather[0].description;
          const icon = item.weather[0].icon.slice(0, -1);

          accumulator.descriptions[description] =
            (accumulator.descriptions[description] || 0) + 1;
          accumulator.icons[description] = icon;

          return accumulator;
        },
        {
          tempMinTotal: [],
          tempMaxTotal: [],
          windSpeedTotal: 0,
          windDegTotal: 0,
          tempTotal: 0,
          feelsLikeTotal: 0,
          pressureTotal: 0,
          humidityTotal: 0,
          descriptions: {},
          icons: {},
        }
      );

      const mostUsedDescription = Object.keys(total.descriptions).reduce(
        (prevKey, currKey) => {
          return total.descriptions[currKey] > total.descriptions[prevKey]
            ? currKey
            : prevKey;
        }
      );

      return {
        date,
        temp_min: Math.min(...total.tempMinTotal).toFixed(1),
        temp_max: Math.max(...total.tempMaxTotal).toFixed(1),
        windSpeed: (total.windSpeedTotal / count).toFixed(2),
        windDeg: total.windDegTotal / count,
        temp: (total.tempTotal / count).toFixed(1),
        feels_like: (total.feelsLikeTotal / count).toFixed(1),
        pressure: (total.pressureTotal / count).toFixed(),
        humidity: (total.humidityTotal / count).toFixed(),
        description: mostUsedDescription,
        icon: total.icons[mostUsedDescription] + 'd',
      };
    }
  );

  fiveDaysForecastDaily.splice(0, 1, current);
  fiveDaysForecastDaily.pop();

  return { fiveDaysForecastDaily, fiveDaysForecastHourly };
};
