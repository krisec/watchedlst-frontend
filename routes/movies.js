'use strict';
const express = require('express');
import * as fs from 'fs';

var movierouter = express.Router(); 

// Should an empty movie link just send you to the search screen?
// If so, what happens if the user writes an invalid movie index? Do we also send that request to the search screen?
// We could just send them to an error screen saying "Sorry! It appears you have stumbled onto a page with no movie
// associated to it. Go back to search?"
// 
movierouter.get('/', (req, res) => {
	console.log('No parameter sent');
	let html;
	html = fs.readFileSync('dist/movie.html', "utf-8");
	res.send(html);
});

// Do we need any more parameters here? I don't think so.
// Now, TODO: Implement a proper handling of html and parameter data.
// Since this is going to be a single page application, we technically should be sending the user to index.html,
// with some parameters which loads the correct react components and leads to the correct movie.
movierouter.get('/:movieid', (req, res) => {
	console.log(req.params);
	let html;
	html = fs.readFileSync('dist/movie.html', "utf-8");
	res.send(html);
});



export default {movierouter};