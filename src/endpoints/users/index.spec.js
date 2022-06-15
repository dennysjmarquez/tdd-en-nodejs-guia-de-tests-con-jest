const usersHandlers = require('./index');
describe('endPoints', () => {
	describe('users', () => {
		describe('GET', () => {
			it('Return to user JSON', async () => {
				// Esto es un mock espía (jest.fn()),
				const axios = {
					// Esto es lo que va a retornar el método get { data: 1 }
					// const { data } = await axios.get
					get: jest.fn().mockResolvedValue({ data: 1 }),
				};
				const res = {
					status: jest.fn().mockReturnThis(),
					send: jest.fn(),
				};
				// Se inyectan o pasan los espías a la función, axios y res
				await usersHandlers({ axios }).get(null, res);

				// Se comprueba que el endpoint retorne un status 200
				expect(res.status.mock.calls).toEqual([[200]]);

				expect(res.send.mock.calls).toEqual([[1]]);
			});
		});
		describe('POST', () => {
			it('Creates a resource', async () => {
				// Esto es un mock espía (jest.fn()),
				const axios = {
					// Esto es lo que va a retornar el método post { data: 1 }
					// const { data } = await axios.post
					post: jest.fn().mockResolvedValue({ data: 1 }),
				};
				const res = {
					status: jest.fn().mockReturnThis(),
					send: jest.fn(),
				};
				const req = {
					body: 'Request body',
				};
				// Se inyectan o pasan los espías a la función, axios y res
				await usersHandlers({ axios }).post(req, res);

				expect(res.send.mock.calls).toEqual([[1]]);
				expect(res.status.mock.calls).toEqual([[201]]);
				expect(axios.post.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/users', 'Request body']]);
			});
		});
		describe('PUT', () => {
			it('Update resource', async () => {
				const axios = {
					put: jest.fn().mockResolvedValue({ data: 1 }),
				};
				const res = {
					sendStatus: jest.fn(),
				};
				const req = {
					body: 'Request body',
					params: { id: 1 },
				};
				// Se inyectan o pasan los espías a la función, axios y res
				await usersHandlers({ axios }).put(req, res);

				expect(res.sendStatus.mock.calls).toEqual([[204]]);
				expect(axios.put.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/users/1', 'Request body']]);
			});
		});
		describe('DELETE', () => {
			it('Deletes a resource', async () => {
				const axios = {
					// Esto es lo que va a retornar el método post { data: 1 }
					// const { data } = await axios.post
					delete: jest.fn(),
				};
				const res = {
					sendStatus: jest.fn(),
				};
				const req = {
					params: { id: 1 },
				};
				// Se inyectan o pasan los espías a la función, axios y res
				await usersHandlers({ axios }).delete(req, res);
				expect(axios.delete.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/users/1']]);
				expect(res.sendStatus.mock.calls).toEqual([[204]]);
			});
		});
	});
});
