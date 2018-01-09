import React from 'react';
import { VictoryBar, VictoryStack, VictoryChart, VictoryAxis, VictoryLabel } from 'victory-native';
import { View, StyleSheet ,Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';

import { tempConverter } from '../../utils/weather/weatherFunctions';
const width = Dimensions.get('window').width;

const TempChart = props => {
  const { isFahrenheit, weatherForecast } = props.weather;

  return (
    <View style={styles.container}>
      <VictoryChart
        height={220}
        width={width}
        padding={{ top: 25, bottom: 20, left: 30 ,right: 20 }}
        domainPadding={{ x: [20, 0] }}
      >
        <VictoryAxis
          dependentAxis
          tickLabelComponent={<VictoryLabel  x={20}  textAnchor="end" />}
          style={{
            axis: { stroke: 'white' },
            ticks: { stroke: 'white', size: 3 },
            tickLabels: { fontSize: 15,  fill: 'white' }
          }}
        />
        <VictoryStack >
          <VictoryBar
            animate={{
              duration: 500,
              onLoad: { duration: 0 }
            }}
            barRatio={0.9}
            data={weatherForecast}
            x="date"
            y={data => isFahrenheit ? parseInt(data.low) : Math.round(tempConverter(data.low))}
            style={{
              data: { fill: '#619CFF', opacity: 0.8 }
            }}
          />
          <VictoryBar
            animate={{
              duration: 500,
              onLoad: { duration: 0 }
            }}
            barRatio={0.9}
            data={weatherForecast}
            x="date"
            y={data => isFahrenheit ?
              parseInt(data.high) - parseInt(data.low) :
              Math.round(tempConverter(data.high)) - Math.round(tempConverter(data.low))
            }
            labels={data => data.day}
            style={{
              data: { fill: '#E99978', opacity: 0.8 },
              labels: { fill: 'white', fontSize: 12, padding: 10 }
            }}
          />
        </VictoryStack>
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'flex-end',
    bottom: 0,
    zIndex: 1
  }
});
const mapStateToProps = ({ weather }) => ({ weather });
export default connect(mapStateToProps)(TempChart);
