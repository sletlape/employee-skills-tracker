import request from 'supertest';
import server from '../src/server';

describe('GET /', () => {
    it('responds with a welcome message', async () => {
        const response = await request(server).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Welcome to the Employee Skills API.' });
    });
});

describe('GET /employees', () => {
    it('responds with a list of employees', async () => {
        const response = await request(server).get('/employees');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(4);
    });
});
