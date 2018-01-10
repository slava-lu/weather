import { fetchData } from '../network/fetchData';
import { NETWORK } from '../../constants';

const getUrlFromLocation = (lat, lon) => `${NETWORK.BASE_URL}?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(${lat}%2C${lon})%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

export const getWeatherForecastRequest = (lat, lon) => fetchData(getUrlFromLocation(lat, lon), 'GET');
export const tempConverter = tempF => (tempF - 32) * 5 / 9;
