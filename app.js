const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./routes/bookroutes')();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('./database/index')();

const app = express();
const { port } = config;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
	// console.log("Gulp running on port " + port);
});
// console.log("Server listening on " + port);

module.exports = app;
