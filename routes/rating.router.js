const { Router } = require('express');
const Rating = require('../models/Rating.schema');
const auth = require('../middlewares/auth.middleware');
const router = Router();

const ex = '604d2cf45c7af70015b2bbe4';

router.post('/post-rating', auth, async (req, res) => {
	try {
		const owner = req.user.userId;
		const { attraction, value } = req.body;
		console.log(attraction)
		console.log(owner)
		console.log(value)

		const exist = await Rating.findOne({ attraction, owner });

		if (exist) {
			await exist.delete();
		}

		const rating = new Rating({
			attraction,
			owner,
			value
		});
		await rating.save();

		
		// const created = await Rating.findOne({ attraction });
		// if (!created) {
		// 	const rating = new Rating({
		// 		attraction
		// 	});
		// 	await rating.save();
		// }
		// const ratingObj = { owner, value }
		// const exist = rating.ratingArr.filter((item) => item.owner !== owner )
		// const exist = await Rating.find({ owner })
		// const result = await Rating.findOneAndUpdate({ attraction }, { $push: { ratingArr: ratingObj }})
		// console.log(exist)

		// console.log(exist)
		// const exist = await rating.ratingArr.map((item) => {
		// 	console.log(item)
		// })
		// if (exist.lenght) {
		// 	console.log('array')
		// } else {
		// 	console.log(' no array')
		// }
		// const ratingObj = { owner: req.user.userId, rating: value };
		// const zalupa = createdAttractionRating.ratingArr.map((item) => {
		//   return item.owner == req.user.userId
		// })

		// if (zalupa) {
		//   return res.json( { message: 'вы оставляли уже рейтинг пошли нахуй'})
		// }
		// const queryResult = await Rating.updateOne({ attraction }, { $push: { ratingArr: ratingObj } });

		res.status(200).json(rating);
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
