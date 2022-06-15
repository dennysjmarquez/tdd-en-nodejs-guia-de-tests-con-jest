const { httpClient } = require('../../services');
const axios = require("axios");
const blogHandlers = ({ axios }) => ({
	post: async (req, res) => {
		const { body } = req;
		const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/posts');

		const found = users.some((user) => user.userId === req.body.userId);
		if (found) {
			const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', body);
			return res.status(201).send(data);
		}
		res.sendStatus(400);
	},
});

module.exports = blogHandlers;
