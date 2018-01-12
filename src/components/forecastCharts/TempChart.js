import React from 'react';
import { VictoryBar, VictoryStack, VictoryChart, VictoryAxis, VictoryLabel, Bar } from 'victory-native';
import { View, StyleSheet ,Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { tempConverter } from '../../utils/weather/weatherFunctions';
const width = Dimensions.get('window').width;

const showTempBottom = (data, isCelsius) => {
  let result;
  if ( isCelsius && data.high >= 0 || !isCelsius && tempConverter(data.high) >= 0) {
    result = isCelsius ?  parseInt(data.low) : Math.round(tempConverter(data.low));
  } else if ( isCelsius && data.high < 0 || !isCelsius && tempConverter(data.high) < 0) {
    result = isCelsius ?  parseInt(data.high) : Math.round(tempConverter(data.high));
  }
  // console.log('result Bottom', result);
  return result;
};

const showTempTop = (data, isCelsius) => {
  if  ( isCelsius && data.low >= 0 || !isCelsius && tempConverter(data.low) >= 0)  {
    return isCelsius ?
      parseInt(data.high) - parseInt(data.low) :
      Math.round(tempConverter(data.high)) - Math.round(tempConverter(data.low));
  } else if  ((isCelsius && data.high >= 0 || !isCelsius && tempConverter(data.high) >= 0) && ( isCelsius && data.low < 0 || !isCelsius && tempConverter(data.low) < 0)) {
    return isCelsius ? parseInt(data.high): Math.round(tempConverter(data.high));
  } else if  ( isCelsius && data.high < 0 || !isCelsius && tempConverter(data.high) < 0) {
    return isCelsius ?
      parseInt(data.low) - parseInt(data.high) :
      Math.round(tempConverter(data.low)) - Math.round(tempConverter(data.high));
  }
};

const TempChart = props => {
  const { isCelsius, forecast } = props.weather;
  return (
    <View style={styles.container}>
      <VictoryChart
        height={220}
        width={width}
        padding={{ top: 25, bottom: 30, left: 30 ,right: 20 }}
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
            barRatio={0.9}
            data={forecast}
            x="date"
            y={data => showTempBottom(data, isCelsius)}
            style={{
              data: {
                fill: (datum) =>  {
                  if (isCelsius) {
                    return (datum.low < 0 && datum.high < 0) ? '#E99978' : '#619CFF';
                  } else {
                    return (tempConverter(datum.low) < 0 && tempConverter(datum.high) < 0) ? '#E99978' : '#619CFF';
                  }
                },
                opacity: 0.8 }
            }}
          />
          <VictoryBar
            barRatio={0.9}
            data={forecast}
            x="date"
            y={data => showTempTop(data, isCelsius)}
            labels={data => data.day}
            style={{
              data: { fill: (datum) => datum.y > 0 ? '#E99978' : '#619CFF', opacity: 0.8 },
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
