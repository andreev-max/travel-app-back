const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const router = Router();
const axios = require('axios');
const { createClient } = require('pexels');

const client = createClient('563492ad6f91700001000001660c67650fd246f79fdca8e73131bf5d');

const getResource = async (url) => {
	const res = await axios.get(`${url}`);
	return res.data;
};

const getWeatherApi = (cityName) =>
	`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d24b900fdfd48da2c4f4dcae7fc4fb18`;

const getCurrency = (code) => `https://v6.exchangerate-api.com/v6/ffd05e84cd25512fd3bbc726/latest/${code}`;

const getTimeZone = (country) => `https://restcountries.eu/rest/v2/name/${country}`

router.get('/country', auth, async (req, res) => {
	try {
		const { country, capital, currencyCode } = req.query;
		// console.log(country);
		// console.log(capital);
		// console.log(currencyCode);

		const fetchedWeather = await getResource(getWeatherApi(capital));
		const weather = {
			wind: `Wind: ${fetchedWeather.wind.speed} mph`,
			pressure: `Pressure: ${fetchedWeather.main.pressure} mb`,
			humidity: `Humidity: ${fetchedWeather.main.humidity} %`,
			temperature: `Temp: ${fetchedWeather.main.temp} °F`,
			altText: fetchedWeather.weather[0].main,
			weatherIconURL: `http://openweathermap.org/img/w/${fetchedWeather.weather[0].icon}.png`
		};

		const fetchedCurrency = await getResource(getCurrency(currencyCode));

		const currency = {
			USD: `One ${currencyCode} can be exchanged for ${fetchedCurrency.conversion_rates.USD} USD`,
			EUR: `One ${currencyCode} can be exchanged for ${fetchedCurrency.conversion_rates.EUR} EUR`,
			BYN: `One ${currencyCode} can be exchanged for ${fetchedCurrency.conversion_rates.BYN} BYN`
		};

		const fetchedImage = await client.photos.search({ query: `${country} flag`, page: 1, per_page: 1 });
		const imageUrl = fetchedImage.photos[0].src.large;


		const fetchedTimeZone = await getResource(getTimeZone(country))
		const timeZone = fetchedTimeZone[0].timezones[0]

		res.status(200).json({weather, currency, imageUrl, timeZone });
	} catch (e) {
		console.log('country', e);
		res.status(500).json({ message: 'something wrong' });
	}
});

module.exports = router;
