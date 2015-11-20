/**
 * Created by nguyenlinh on 11/18/15.
 */
var express = require('express');
var router = express.Router();
var Utils = require('../utils').Utils;
var cp = require('child_process');
var fs = require('fs');


router.get('/images/upload', function(req, res, next) {

	try
	{
		var fb_id = req.ensureParam("fb_id", "string");
	}
	catch (e)
	{
		return res.json(404, {error: e});
	}

	console.log(fb_id);

	var python = cp.spawn(
		'python',
		// second argument is array of parameters, e.g.:
		[Utils.PYTHON_SCRIPT, fb_id], {stdio: [null, null, null, 'ipc']}
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

})

module.exports = router;
