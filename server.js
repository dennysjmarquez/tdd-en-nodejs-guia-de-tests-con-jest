const express = require('express');
const bodyParser = require('body-parser');
const { axios } = require('./src/services');
const { users, blog } = require('./src/endpoints');
const { authenticate } = require('./src/middlewares');
const app = express();
const port = 3000;

// Api
// https://jsonplaceholder.typicode.com/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const usersHandlers = users({ axios });
const blogHandlers = blog({ axios });

app.post('/blog', authenticate, blogHandlers.post);

app.get('/users', usersHandlers.get);
app.post('/users', usersHandlers.post);
app.put('/users/:id', usersHandlers.put);
app.delete('/users/:id', usersHandlers.delete);

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`** Servidor corriendo en: http://localhost:${port}/ **`);
	});
}

module.exports = app;
