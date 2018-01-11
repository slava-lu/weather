import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import { getWeatherForecast } from '../modules/weather';
import { getLocation } from '../modules/location';

class Loading extends Component {
  componentDidMount() {
    this.props.getLocation();
  }

  componentWillReceiveProps(nextProps) {
    const { weatherAPI: { loaded } } = nextProps;
    const { weather: { forecast } } = nextProps;
    if (loaded || forecast.length > 0 ) {
      this.props.navigation.navigate('weather');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text  style={styles.textStyle}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#83868B'
  },
  textStyle: {
    fontSize: 20,
    color: 'white'
  }
});

const mapStateToProps = ({ weatherAPI, weather }) => ({ weatherAPI, weather });

export default connect(mapStateToProps, { getWeatherForecast, getLocation })(Loading);
