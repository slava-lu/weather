import React from 'react';
import { StyleSheet, View } from 'react-native';

import ForecastCardList from './ForecastCardList';
import TempSwitcher from './TempSwitcher';

const ForecastInfoAll = props =>
  (
    <View style={styles.container}>
      <TempSwitcher />
      <ForecastCardList />
    </View>
  );

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});

export default ForecastInfoAll;
