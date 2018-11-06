// required files
const express = require('express');
const extraScripts = require('../extraScripts/scrapper');
const shortid = require('shortid');
const fs = require('fs');

const reqRouter = express.Router();

function router() {
	reqRouter.route('/')
		.get((req, res) => {
			let webURL = req.query.url;
			webURL = decodeURIComponent(webURL);
			const newID = shortid.generate();
			const {
				requestURL
			} = extraScripts;
			requestURL(webURL, newID);
			let myTimeOut;
			res.redirect(`/site/${newID}.ejs`)
			fs.watch('files', (eventType) => {
				if (eventType) {
					clearTimeout(myTimeOut);
					myTimeOut = setTimeout(function () {
						// this is in infinte loop right now
					}, 2000);
				}
			});
		});
	return reqRouter;
}
// exporting out the router
module.exports = router;