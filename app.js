const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const auth = require('./routes/auth.routes');
const rating = require('./routes/rating.router');
const country = require('./routes/country.router');
require('dotenv').config();
const uri = process.env.MONGO_CONNECTION_URL;

app.use(express.json({ extended: true }))
app.use(cors());
app.use(auth)
app.use(country)
app.use(rating)

async function start() {
	try {
		await mongoose.connect(uri, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		app.listen(process.env.PORT || 8080, () => {
			console.log(`Server has been started on port ${process.env.PORT || 8080}`);
		});
	} catch (e) {
		console.log('Server error', e.message);
    process.exit(1)
	}
}

start();