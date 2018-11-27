
//TODO: Routing, Frontend and more. Figure out linking between two servers.
	//Do routing here!

	/*
		Routing:
			watchedlst.com/api/[apiname/[apikey]/[paramater1&paramater2] => Send call to C# server (Mostly used internally. May be used by users to call our API, depending on whether we want a public API or not, if public require API key, ignore if not.)
			watchedlst.com/movie/[id] => Send to individual movie screen
			watchedlst.com/series/[id] => Send to individual tv series screen
			watchedlst.com/search[?query1=string&query2=string] => Send to search screen and optionally search on provided queries.
			watchedlst.com/list/[profileid]&[listid] => Send to list screen
			watchedlst.com/profile/[id] => Send to profile page for person.
			watchedlst.com => send to home.
	*/

	/*
		Now this application will in theory be a single paged react app, maybe a vue.js app if React is a hassle to set up.
		Therefore we will do most routing in script, with this server mostly handling api calls, which it will route to the dotnet server.
		Still, we need to handle the case where someone is linked to a specific part of the website, so that we don't send people to the home page
		unless they specificly type watchedlst.com. 
	*/
	/*
		The C# server will handle database requests, so we won't be writing anything of that sort. This is due to the single-threaded nature
		of node.js, compared to the multi-threaded nature of C#. This is more future proofing than anything, and is an excercise in multi-server setups.
		The question is whether or not we will host both sites on Azure or not, or if we have the front-end server on a different platform, compared to the
		dotnet server.

		We should prbably use Azure for the dotnet server due to the fact that C# and ASP.net integrates nicely with it, due to Microsoft :)
	*/

import * as HTTP from 'http';
import * as fs from 'fs';

var movieRouter = require('./routes/movies').default;
var searchRouter = require('./routes/search').default;

const express = require('express');
const port = "3000"

//App is the main router for watchedlst.
//For more modular routing, we'll use the Router class from express...
//But that will not be important for a while...

const app = express();
console.log(searchRouter);
// OK, so now we know. ES6 node.js using babel gets a bit fucky...
// But I think the fucky parts are fine due to the benefits of the cleaner syntax in ES6.
app.use('/movie/', movieRouter.movierouter);
app.use('/search/', searchRouter);

// Sends the user to home
app.get('/', (req, res) => {
	let html = fs.readFileSync("dist/index.html", 'utf-8');
	res.send(html);
});

// Do I even have to send any requests to the api server?... Yes, but maybe not through the node server.
// We could possibly that clientside, seeing as the api-server will respond using JSON.
// In theory, we could do most of the routing client side, but this might be more secure.

app.listen(port, () => console.log(`The app is listening on port ${port}!`));
//Notice for future self, remember to have an initial decleration with let or var
//The compiler gets pissy if not :)
// const server = HTTP.createServer((req, res) => {
// 	let html = fs.readFileSync("dist/index.html", 'utf-8');
// 	res.statusCode = 200;
// 	res.setHeader('Content-type', 'text/html');
// 	res.end(html);
// });

// server.listen(port, hostname, () =>{
// 	console.log("Server running at http://${hostname}:${port}/");
// });

