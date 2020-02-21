// To get our microservice API project underway, we need to set up express.js.
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// and set cors in package.json
// so that this API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// test "hello"
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/timestamp/:dateString?', (req, res) => {
  const dateString = req.params.dateString;
  let date;
  // if the date sring is empty, it should be equvalent to new Date() to 
  // return the current time in both formats.
  if(!dateString) {
    date = new Date();
  } else {
    // if dateSting isn't empty
    // if dateString isn't a whole number, to convet it to a whole number
    if(!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }
  // If the date string isn't invalid, the api returns a JSON having the structure
  // {"unix": null, "utc" : "Invalid Date" }.
  if(date.toString() === 'Invalid Date'){
    res.json({ error : date.toString()});
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString()});
  }
  
});