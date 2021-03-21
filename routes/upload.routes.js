


// app.post('/upload', loader.single('avatar'), async function(req, res) {
// 	try {
// 		const result = await cloudinary.uploader.upload(req.file.path, { upload_preset: travelApp });
// 		res.send(result);
// 	} catch (e) {
// 		console.log(e);
// 		res.send(e);
// 	}
// 	fs.unlink(req.file.path);
// });