/**
 * Created by nguyenlinh on 11/18/15.
 */
var express = require('express');
var router = express.Router();
var Utils = require('../utils').Utils;
var cp = require('child_process');
var fs = require('fs');
var Image = require('../models/image');


router.get('/images/upload', function(req, res, next) {

	try
	{
		var fb_id = req.ensureParam("fb_id", "string");
		var background = req.ensureParam("background", "string");
	}
	catch (e)
	{
		return res.json(404, {error: e});
	}

	console.log("dmdmd", fb_id);
	console.log(background);

	var python = cp.spawn(
		'python',
		// second argument is array of parameters, e.g.:
		[Utils.PYTHON_SCRIPT, fb_id, background], {stdio: [null, null, null, 'ipc']}
	);

	python.stdout.pipe(process.stdout);

	python.on('exit', function() {
		var download_link = 'http://localhost:8081/api/images/download/' + fb_id;
		console.log(download_link);
		return res.json(200, {download_link: download_link});
	});

});

router.get('/images/download/:id', function (req, res, next){
	try {
		var fb_id = req.ensureParam("id", "string");
	}

	catch (e) {
		return res.send(404, {error: e});
	}

	fs.exists(Utils.IMAGES_FOLDER + '/' + fb_id + "_out.jpg", function(exists) {
		if(exists)
		{
			return res.download(Utils.IMAGES_FOLDER + '/' + fb_id + "_out.jpg");
		}
		else
		{
			return res.send(404);
		}
	})

});

router.get('/images/getBackgrounds', function (req, res, next) {
	Image.find({}, function (err, images) {
		if (err) {
			return res.status(404).send({message: 'Fail to load background images!'});
		}

		return res.json(200, {
			backgroundList: images
		})
	})
});

router.get('/images/addBackGrounds', function (req, res, next) {

	var image_1 = new Image({
		name: 'Background_1',
		description: 'Background_1',
		path: 'images/bg2.jpg'
	});

	var image_2 = new Image({
		name: 'Background_2',
		description: 'Background_2',
		path: 'images/bg3.jpg'
	});

	var image_3 = new Image({
		name: 'Background_3',
		description: 'Background_3',
		path: 'images/bg4.jpg'
	});

	var image_4 = new Image({
		name: 'Background_4',
		description: 'Background_4',
		path: 'images/bg5.jpg'
	});

	image_1.save();
	image_2.save();
	image_3.save();
	image_4.save();
	return res.json(200, {
			message: 'Success to add a new background image!'
		})
})



module.exports = router;
