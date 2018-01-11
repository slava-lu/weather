import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Platform, LayoutAnimation } from 'react-native';

import { THEME } from '../../constants';
import { tempConverter } from '../../utils/weather/weatherFunctions';

const width = Dimensions.get('window').width;
const cardSpacing = 4;
const cardSize = (width - 6 * cardSpacing) / 3;

const shadowAndroid = {
  elevation: 2
};
const shadowIOS = {
  shadowOpacity: 0.8,
  shadowRadius: 3,
  shadowOffset: {
    height: 1,
    width: 1
  }
};
const addShadow = Platform.OS ==='ios' ? shadowIOS : shadowAndroid;

const ForecastCardSingle = props => {
  const { item, isCelsius } = props;
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  return (
    <View style={[styles.container, addShadow]}>
      <Text style={styles.textMain}>{item.date}</Text>
      <View style={styles.tempContainer}>
        <View style={styles.tempItemContainer}>
          <Image style={styles.arrow} source={require('../../assets/arrow_up_red.png')} />
          <Text style={styles.textTemp}>{isCelsius ? item.high : Math.round(tempConverter(item.high))}</Text>
        </View>
        <View style={styles.tempItemContainer}>
          <Image style={styles.arrow} source={require('../../assets/arrow_down_blue.png')} />
          <Text style={styles.textTemp}>{isCelsius ? item.low : Math.round(tempConverter(item.low))}</Text>
        </View>
      </View>
      <Text style={styles.textMain}>{item.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'grey',
    borderWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: cardSize,
    height: cardSize *1.2,
    marginHorizontal: cardSpacing,
    paddingHorizontal: 4,
    backgroundColor: THEME.CARD_BACKGROUND_COLOR
  },
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch'
  },
  tempItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  arrow: {
    width: 10,
    height: 20,
    marginRight: 5
  },
  textMain: {
    fontSize: 14,
    color: 'white'
  },
  textTemp: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default ForecastCardSingle;
