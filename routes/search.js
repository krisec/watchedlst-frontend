import * as fs from 'fs';

const express = require('express'); // Really wish I could use ES6 syntax, but I've experienced problems with that.

var router = express.Router();

router.get("/", (req, res) => {
	let html;
	html = fs.readFileSync('dist/search.html','utf-8') // If we're making this website into a single-page application, we should really change the way we do this routing.
	res.send(html);	
});

export default router;