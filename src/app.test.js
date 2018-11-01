import request from 'supertest'
import app from './app';
describe('src/app.js', () => {

    describe('/', () => {
        it('should response with status 200', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
        });
    })  
});