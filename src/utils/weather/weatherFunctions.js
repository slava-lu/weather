import { fetchData } from '../network/fetchData';
import { NETWORK } from '../../constants';

const url = `${NETWORK.BASE_URL}?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

export const getWeatherForecastRequest = () => fetchData(url, 'GET');
export const tempConverter = tempF => (tempF - 32) * 5 / 9;
