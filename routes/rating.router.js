const { Router } = require('express');
const Rating = require('../models/Rating.schema');
const auth = require('../middlewares/auth.middleware');
const router = Router();

router.post('/post-rating', auth, async (req, res) => {
	try {
    const owner = req.user.userId
		const { country, value } = req.body;
		let createdCountryRating = await Rating.findOne({ country });
		if (!createdCountryRating) {
			res.status(200).json({ message: 'country was not found' });
			createdCountryRating = new Rating({
				country
			});
			await createdCountryRating.save();
		}
    
		const ratingObj = { owner: req.user.userId, rating: value };
    const zalupa = createdCountryRating.ratingArr.map((item) => {
      return item.owner == req.user.userId
    })
    console.log(createdCountryRating.ratingArr)
    console.log(zalupa)
    console.log(req.user.userId)
    if (zalupa) {
      return res.json( { message: 'вы оставляли уже рейтинг пошли нахуй'})
    }
		const queryResult = await Rating.updateOne({ country }, { $push: { ratingArr: ratingObj } });
    
    
		res.status(201).json(zalupa);
	} catch (e) {
		res.status(500).json({ message: 'something wrong' });
	}
});

router.get('/all-rating', auth, async (req, res) => {
	try {
		console.log(req.query);
		res.status(200).json({ message: 'zalupa' });
	} catch (e) {
		res.status(500).json({ message: 'something wrong' });
	}
});

// router.get('/:id', auth, async (req, res) => {
// 	try {
// 		const link = await Link.findById(req.params.id);
// 		res.json(link);
// 	} catch (e) {
// 		res.status(500).json({ message: 'something wrong' });
// 	}
// });

module.exports = router;
