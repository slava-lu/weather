import { combineReducers } from 'redux';
import weather from '../modules/weather';
import weatherLoadingStatuses from '../modules/weatherLoadingStatuses';
import location from '../modules/location';

const rootReducer = combineReducers({
  weather,
  weatherLoadingStatuses,
  location
});

export default rootReducer;
