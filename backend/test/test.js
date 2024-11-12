const request = require('supertest');
const app = require('./server'); 

describe('GET /ruta', () => {
    it('responds with json', async () => {
        const response = await request(app).get('/ruta');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
});
