const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const auth = require('./routes/auth.routes');
require('dotenv').config();
const uri = process.env.MONGO_CONNECTION_URL;

app.use(express.json({ extended: true }))
app.use(cors());
app.use(auth)

// const PORT = config.get('PORT') || 8080;

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