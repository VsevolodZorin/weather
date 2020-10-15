import React, { useEffect, useState } from 'react';

const LAT = '33.441792'
const LON = '94.037689'
const KEY = process.env.REACT_APP_WEATHER_KEY;

console.log(KEY)

function App() {
  const [temp , setTemp] = useState(0)

  useEffect(() => {
    const fetchWeather = async () => {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&appid=${KEY}`
      const data = await fetch(url).then(res => res.json())

      const dailyTemperatures = data.daily.map(d => d.temp)
      const dailyAverages = dailyTemperatures.map(d => (d.min + d.max)/2)
      const temperatureSum = dailyAverages.reduce((prev, acc) => acc + prev, 0)
      const averageTemperature = temperatureSum / dailyAverages.length;

      setTemp(averageTemperature)
    }
    fetchWeather()
  }, [])

  return (
    <>
      Средняя температура {temp}
    </>
  );
}

export default App;
