import { TabNavigator } from 'react-navigation';

import Loading from '../screens/Loading';
import Weather from '../screens/Weather';

const MainNavigator = TabNavigator({
  loading: {
    screen: Loading
  },
  weather: {
    screen: Weather
  }
}, {
  animationEnabled: false,
  swipeEnabled: false,
  navigationOptions: {
    tabBarVisible: false
  }
});

export default MainNavigator;
