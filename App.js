import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from 'axios';
import Weather from './Weather';

const API = '6967dc6b8028bf384b7f73b6f691f6ab';


const App = () => {


  const [isLoading, setLoading] = useState(true);
  const [temp, setTemp] = useState(0);
  const [condition, setCondition] = useState('Clear');

  useEffect(() => {
    getLocation();
  }, [])



  

  const getWeather = async (lat, long) => {
    try {
      console.log(lat, long);
      const { data: {
        main:{temp},
        weather} 
      } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API}`);
      console.log(weather[0].main);
      setCondition(weather[0].main);
      setTemp(Math.round(temp));

    } catch (err) {
      console.log(err);
      setLoading(true);
    }
  }

  const getLocation = async () => {

    try {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('denied');
        setLoading(true);
        return;
      }
      const { 
        coords:{ latitude, longitude }
      } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      console.log(latitude, longitude)
      if(!latitude) return;
      getWeather(latitude, longitude);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(true);
    }
  }

  return (
    isLoading ? <Loading /> : <Weather temp={temp} condition={condition}/>
  );

}


export default App;