import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import ForecastCardSingle from './ForecastCardSingle';
import { increaseIndex, decreaseIndex, setIndex } from '../../modules/weather';
import { THEME } from '../../constants';

import { tempConverter } from '../../utils/weather/weatherFunctions';

const width = Dimensions.get('window').width;
const moveValue = 3;

class ForecastCardList extends Component {
  scrollToRight = () => {
    const { increaseIndex, weather: { currentIndex } } = this.props;
    increaseIndex(moveValue);
    this.flatListRef.scrollToIndex({ animated: true, index: currentIndex + moveValue });
  };

  scrollToLeft = () => {
    const { decreaseIndex, weather: { currentIndex } } = this.props;
    decreaseIndex(moveValue);
    const scrollIndex = (currentIndex - moveValue > 0) ? currentIndex - moveValue : 0;
    this.flatListRef.scrollToIndex({ animated: true, index: scrollIndex });
  };

  handleScroll = (event) => {
    const { setIndex } = this.props;
    const scrollIndex = Math.ceil(event.nativeEvent.contentOffset.x / width * moveValue);
    setIndex(scrollIndex);
  };

  render() {
    const { weather: { forecast, currentIndex, forecastLength, isCelsius, city, currentTemp } } = this.props;
    const tempSymbol = isCelsius ? ' C' : ' F';
    const weatherCard = forecast.map(item => (
      <ForecastCardSingle key={item.date} item={item} isCelsius={isCelsius} />
    ));

    const arrowLeft = (currentIndex > 0)
      ? (<TouchableOpacity style={styles.touchableArea} onPress={this.scrollToLeft}>
        <Image style={styles.arrow} source={require('../../assets/arrow_left_white.png')} />
      </TouchableOpacity>)
      : <Text style={styles.blankText} />;

    const arrowRight = (currentIndex < forecastLength - moveValue)
      ? (<TouchableOpacity style={styles.touchableArea} onPress={this.scrollToRight}>
        <Image style={styles.arrow} source={require('../../assets/arrow_right_white.png')} />
      </TouchableOpacity>) : <Text style={styles.blankText} />;

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {arrowLeft}
          <View style={styles.cityContainer}>
            <Text style={styles.cityText}>{city},</Text>
            <Text style={styles.tempText}>{isCelsius ? currentTemp : parseInt(tempConverter(currentTemp))}{tempSymbol}</Text>
          </View>
          {arrowRight}
        </View>
        <FlatList
          ref={(ref) => {
            this.flatListRef = ref;
          }}
          data={weatherCard}
          renderItem={({ item }) => item}
          onMomentumScrollEnd={this.handleScroll}
          horizontal
          pagingEnabled
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  touchableArea: {
    width: 50,
    height: 50,
    justifyContent: 'center'
  },
  arrow: {
    width: 50,
    height: 20
  },
  blankText: {
    width: 50,
    height: 20,
    backgroundColor: 'transparent'
  },
  cityText: {
    fontSize: 20,
    color: THEME.TEXT_COLOR,
    backgroundColor: 'transparent'
  },
  tempText: {
    fontSize: 22,
    color: THEME.TEXT_COLOR,
    backgroundColor: 'transparent',
    paddingLeft: 10,
  },
  cityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  }
});

const mapStateToProps = ({ weather }) => ({ weather });

export default connect(mapStateToProps, { increaseIndex, decreaseIndex, setIndex })(ForecastCardList);
