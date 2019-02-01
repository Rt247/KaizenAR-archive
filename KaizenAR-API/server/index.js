const express = require('express');
const app = express();

//Import routing options from the routes folder :
const index = require('./routes/index');
const trello = require('./routes/trello');
const queriesDB = require('./routes/queriesDB');
const login = require('./routes/login');

//High Level routing options

app.use(express.static(__dirname));
app.use('/', index);              //http://ec2-35-178-8-185.eu-west-2.compute.amazonaws.com:8080/
app.use('/trello', trello);       //http://ec2-35-178-8-185.eu-west-2.compute.amazonaws.com:8080/trello
app.use('/queriesDB', queriesDB); //http://ec2-35-178-8-185.eu-west-2.compute.amazonaws.com:8080/queriesDB
app.use('/login', login);

if(!module.parent) {
   app.listen(8080, () => console.log('Server running on port 8080'));
}

module.exports = app;
