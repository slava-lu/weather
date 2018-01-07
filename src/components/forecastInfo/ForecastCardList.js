import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import ForecastCardSingle from './ForecastCardSingle';
import { increaseIndex, decreaseIndex, setIndex } from '../../modules/weather';

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
    const { weather: { weatherForecast, currentIndex, forecastLength, isFahrenheit } } = this.props;
    const weatherCard = weatherForecast.map(item => (
      <ForecastCardSingle key={item.date} item={item} isFahrenheit={isFahrenheit} />
    ));

    const arrowLeft = (currentIndex > 0)
      ? (<TouchableOpacity style={styles.touchableArea} onPress={this.scrollToLeft}>
        <Image style={styles.arrow} source={require('../../assets/arrow_left_white.png')} />
      </TouchableOpacity>)
      : <Text />;

    const arrowRight = (currentIndex < forecastLength - moveValue)
      ? (<TouchableOpacity style={styles.touchableArea} onPress={this.scrollToRight}>
        <Image style={styles.arrow} source={require('../../assets/arrow_right_white.png')} />
      </TouchableOpacity>) : <Text />;

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {arrowLeft}
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
  buttonContainer: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  }
});

const mapStateToProps = ({ weather }) => ({ weather });

export default connect(mapStateToProps, { increaseIndex, decreaseIndex, setIndex })(ForecastCardList);
