const request = require('supertest');
const app = require('../../../server');

// Pruebas de integración para probar absolutamente toda la cadena

describe('Blog, test of integration', () => {
	describe('endPoint', () => {
		describe('POST', () => {
			it('Create new post', async () => {
				const response = await request(app)
					.post('/blog')
					.send({ userId: 5 })
					.set('user_id', 1)
					.set('Content-Type', 'application/json');

				expect(response.statusCode).toEqual(201);
				expect(response.body.userId).toEqual(5);
				expect(response.body).toHaveProperty('id');
			});
			it('Does not create a new post', async () => {
				const response = await request(app)
					.post('/blog')
					.send({ userId: 100 })
					.set('user_id', 1)
					.set('Content-Type', 'application/json');

				expect(response.statusCode).toEqual(400);
			});
		});
	});
});
