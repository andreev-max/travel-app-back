const config = require('config');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');
const auth = require('./routes/auth.router');
const rating = require('./routes/rating.router');
const country = require('./routes/country.router');
const upload = require('./routes/upload.router');

console.log(process.env.MONGO_CONNECTION_URL)

const app = express();

app.use(express.json({ extended: true }));
app.use(
	fileupload({
		useTempFiles: true
	})
);
app.use(cors());
app.use(auth);
app.use(country);
app.use(rating);
app.use(upload);

async function start() {
	try {
		await mongoose.connect(process.env.MONGO_CONNECTION_URL, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});
		app.listen(process.env.PORT || 8080, () => {
			console.log(`Server has been started on port ${process.env.PORT || 8080}`);
		});
	} catch (e) {
		console.log('Server error', e.message);
		process.exit(1);
	}
}

start();
