import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { THEME } from '../../constants';

import { changeToCelsius, changeToFahrenheit } from '../../modules/weather';

const TempSwitcher = props => {
  const { weather: { isFahrenheit }, changeToCelsius, changeToFahrenheit } = props;
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.touchableArea} onPress={changeToCelsius}>
          <View style={styles.button}>
            <View style={(!isFahrenheit) ? styles.selected : null} />
          </View>
        </TouchableOpacity>
        <Text style={styles.buttonText}>Celsius</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.touchableArea} onPress={changeToFahrenheit}>
          <View style={styles.button}>
            <View style={isFahrenheit ? styles.selected : null} />
          </View>
        </TouchableOpacity>
        <Text style={styles.buttonText}>Fahrenheit</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 23,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'grey'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  },
  buttonText: {
    color: THEME.TEXT_COLOR,
    backgroundColor: 'transparent'
  },
  touchableArea: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: THEME.BUTTON_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: THEME.BUTTON_COLOR
  }
});

const mapStateToProps = ({ weather }) => ({ weather });

export default connect(mapStateToProps, { changeToCelsius, changeToFahrenheit })(TempSwitcher);
