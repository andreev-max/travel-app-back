const { Router } = require('express');
const Rating = require('../models/Rating.schema');
const auth = require('../middlewares/auth.middleware');
const router = Router();
const axios = require('axios');
const { createClient } = require('pexels');

const client = createClient('563492ad6f91700001000001660c67650fd246f79fdca8e73131bf5d');

const getResource = async (url) => {
	const res = await axios.get(`${url}`);
	return res.data;
};

const api = '5ae2e3f221c38a28845f05b6f6e71bf1418f61c83b379c005bffa503';

const getWeatherApi = (cityName) =>
	`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d24b900fdfd48da2c4f4dcae7fc4fb18`;

const getWeatherIcon = (name) => `http://openweathermap.org/img/w/${name}.png`;

const getCurrency = (code) => `https://v6.exchangerate-api.com/v6/ffd05e84cd25512fd3bbc726/latest/${code}`;

const getTrip = (name) => `https://api.opentripmap.com/0.1/en/places/geoname?apikey=${api}&${name}`;

router.get('/country', auth, async (req, res) => {
	try {
		console.log(req.query);
		const { country, capital, currencyCode } = req.query;
		// console.log(country);
		// console.log(capital);
		// console.log(currencyCode);

		const fetchedWeather = await getResource(getWeatherApi(capital));
		const fetchedIcon = await getResource(getWeatherIcon(fetchedWeather.weather[0].icon));
		const weather = {
			wind: `Wind: ${fetchedWeather.wind.speed} mph`,
			pressure: `Pressure: ${fetchedWeather.main.pressure} mb`,
			humidity: `Humidity: ${fetchedWeather.main.humidity} %`,
			temperature: `Temp: ${fetchedWeather.main.temp} °F`,
			altText: fetchedWeather.weather[0].main,
			icon: fetchedIcon
		};

		const fetchedCurrency = await getResource(getCurrency(currencyCode));

		const currency = {
			USD: `One ${currencyCode} can be exchanged for ${fetchedCurrency.conversion_rates.USD} EUR`,
			EUR: `One ${currencyCode} can be exchanged for ${fetchedCurrency.conversion_rates.EUR} USD`,
			BYN: `One ${currencyCode} can be exchanged for ${fetchedCurrency.conversion_rates.BYN} BYN`
		};

		const fetchedImage = await client.photos.search({ query: `${capital} flag`, page: 1, per_page: 1 });
		const imageUrl = fetchedImage.photos[0].src.large;

		
		

		res.status(200).json({ weather, currency, imageUrl });
	} catch (e) {
		res.status(500).json({ message: 'something wrong' });
	}
});

module.exports = router;
