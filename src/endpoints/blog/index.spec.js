/*

	Casos:

	1 - Solo los administradores pueden acceder a este endpoint
	2 - El administrador va a poder crear entradas a nombre de otro usuario
	3 - Si el usuario no existe debe de arrojar error
	4 - El usuario a quien se le va a asignar un post tiene que venir dentro del body en la petición

n*/

const blogHandlers = require('./index');
describe('Blog', () => {
	describe('endPoints', () => {
		describe('POST', () => {
			it('Should create', async () => {
				const users = [{ userId: 1 }, { userId: 2 }];
				const post = {
					userId: 1,
					id: 1,
					title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
					body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
				};
				const req = { body: post };

				const res = {
					status: jest.fn().mockReturnThis(),
					send: jest.fn(),
				};
				const axios = {
					get: jest.fn().mockReturnValue({ data: users }),
					post: jest.fn().mockReturnValue({ data: { id: 1000 } }),
				};

				await blogHandlers({ axios }).post(req, res);

				expect(axios.get.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/posts']]);
				expect(axios.post.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/posts', post]]);
				expect(res.status.mock.calls).toEqual([[201]]);
				expect(res.send.mock.calls).toEqual([[{ id: 1000 }]]);
			});

			it('Should not create if userId does not exist in users', async () => {
				const users = [{ userId: 1 }, { userId: 2 }];
				const post = {
					userId: 3,
					id: 1,
					title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
					body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
				};
				const req = { body: post };
				const res = {
					status: jest.fn().mockReturnThis(),
					send: jest.fn(),
					sendStatus: jest.fn(),
				};
				const axios = {
					get: jest.fn().mockReturnValue({ data: users }),
					post: jest.fn().mockReturnValue({ data: { id: 1000 } }),
				};

				await blogHandlers({ axios }).post(req, res);

				expect(axios.post.mock.calls).toEqual([]);
				expect(res.sendStatus.mock.calls).toEqual([[400]]);
			});
		});
	});
});
