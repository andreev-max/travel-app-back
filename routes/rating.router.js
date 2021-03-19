const { Router } = require('express');
const Rating = require('../models/Rating.schema');
const auth = require('../middlewares/auth.middleware');
const router = Router();

router.post('/post-rating', auth, async (req, res) => {
	try {
		const owner = req.user.userId;
		const { attraction, value, userName } = req.body;
		console.log(req.body)
		// console.log(attraction);
		// console.log(owner);
		// console.log(value);

		const exist = await Rating.findOne({ attraction, owner });

		if (exist) {
			await exist.delete();
		}

		const rating = new Rating({
			attraction,
			owner,
			value,
			name: userName
		});
		await rating.save();

		const allRating = await Rating.find({ attraction });

		res.status(200).json(allRating);
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: 'something wrong' });
	}
});

module.exports = router;
