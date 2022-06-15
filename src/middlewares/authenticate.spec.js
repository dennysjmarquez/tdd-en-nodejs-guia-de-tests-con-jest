const authenticate = require('./authenticate');
describe('Middlewares', () => {
	describe('authenticate', () => {
		it('Should have id 1', () => {
			const req = {
				header: jest.fn().mockReturnValue('1'),
			};
			const res = {
				sendStatus: jest.fn(),
			};
			const next = jest.fn();
			authenticate(req, res, next);

			expect(req.header.mock.calls).toEqual([['user_id']]);
			expect(res.sendStatus.mock.calls).toEqual([]);
			expect(next.mock.calls).toEqual([[]]);
		});
		it('Should fail if user is not the one with ID 1', () => {
			const req = {
				header: jest.fn().mockReturnValue('2'),
			};
			const res = {
				sendStatus: jest.fn(),
			};
			const next = jest.fn();
			authenticate(req, res, next);

			expect(req.header.mock.calls).toEqual([['user_id']]);
			expect(res.sendStatus.mock.calls).toEqual([[403]]);
			expect(next.mock.calls).toEqual([]);
		});
	});
});
