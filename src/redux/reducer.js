import { combineReducers } from 'redux';
import weather from '../modules/weather';

const rootReducer = combineReducers({
  weather
});

export default rootReducer;
