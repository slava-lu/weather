import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

import ForecastInfoAll from '../components/forecastInfo/ForecastInfoAll';
import TempChart from '../components/forecastCharts/TempChart';

const Weather = props =>
  (
    <ImageBackground style={styles.backgroundImage} source={require('../assets/background.jpg')} >
      <ForecastInfoAll />
      <TempChart />
    </ImageBackground>
  );

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'space-between'
  }
});

export default Weather;
