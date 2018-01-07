import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import { getWeatherForecast } from '../modules/weather';

class Loading extends Component {
  componentDidMount() {
    this.props.getWeatherForecast();
  }

  componentWillReceiveProps(nextProps) {
    const { weather: { loaded } } = nextProps;
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

const mapStateToProps = ({ weather }) => ({ weather });

export default connect(mapStateToProps, { getWeatherForecast })(Loading);
