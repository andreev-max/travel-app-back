const { Router } = require('express');
const Rating = require('../models/Rating');
const auth = require('../middlewares/auth.middleware');
const router = Router();

router.post('/rating', auth, async (req, res) => {
	try {
    const { country, rating } = req.body

    const countryRating = new Rating({
      country, rating
    })

    await countryRating.save()

    res.status(201).json({ countryRating })
	} catch (e) {
		res.status(500).json({ message: 'something wrong' });
	}
});

router.get('/', auth, async (req, res) => {
	try {
		const links = await Link.find({ owner: req.user.userId });
		res.json(links);
	} catch (e) {
		res.status(500).json({ message: 'something wrong' });
	}
});

router.get('/:id', auth, async (req, res) => {
	try {
		const link = await Link.findById(req.params.id);
		res.json(link);
	} catch (e) {
		res.status(500).json({ message: 'something wrong' });
	}
});

module.exports = router;
