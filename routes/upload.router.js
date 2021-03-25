const { Router } = require('express');
const User = require('../models/User.schema');
const auth = require('../middlewares/auth.middleware');
const router = Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

router.post('/upload', auth, async function(req, res) {
	// console.log(req)
	const ID = req.user.userId;
	console.log('user', ID);
	// console.log(req.body);
	// console.log(req.body.files);
	// console.log('formData', req.formData);
	// console.log('file', req.file);
	console.log(req.files);
	try {
		const result = await cloudinary.uploader.upload(req.files.avatar.tempFilePath, { upload_preset: 'avatarPreset' });
		const avatarURL = result.url;
		const user = await User.findByIdAndUpdate(ID, { avatarURL: result.url, new: true});

		res.status(200).json({ avatarURL, user });
	} catch (e) {
		console.log(e);
		res.send(e);
	}
});

module.exports = router;
