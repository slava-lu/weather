import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import { getWeatherForecast } from '../modules/weather';
import { getLocation } from '../modules/location';

class Loading extends Component {
  componentDidMount() {
    this.props.getLocation();
    this.props.getWeatherForecast();
  }

  componentWillReceiveProps(nextProps) {
    const { weatherLoadingStatuses: { loaded } } = nextProps;
    if (loaded) {
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
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 20
  }
});

const mapStateToProps = ({ weatherLoadingStatuses }) => ({ weatherLoadingStatuses });

export default connect(mapStateToProps, { getWeatherForecast, getLocation })(Loading);
