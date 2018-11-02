import request from 'supertest';
import app from './app';
describe('src/app.js', () => {

    describe('/', () => {
        it('should response with status 200', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
        });
    });


    describe('/tracks', () => {
        it('should respond with 200', async () => {
            const response = await request(app).get('/tracks');
            expect(response.status).toBe(200);
        });
        it('should response with an array', async () => {
            const response = await request(app).get('/tracks');
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('/track/:id/stream', () => {

        it('should respond with signed url', async () => {
            const response = await request(app).get(`/track/${encodeURIComponent('Way Out West/We Love Machine/Ultra Violet.mp3')}/stream`);
            expect(response.status).toBe(200);
        });
        it('should respond with signed url', async () => {
            const response = await request(app).get(`/track/${encodeURIComponent('Way Out West/We Love Machine/Ultra Violet.mp3')}/stream`);
            expect(response.text).toContain('https://pg-music.s3.us-west-2.amazonaws.com/Way%20Out%20West/We%20Love%20Machine/Ultra%20Violet.mp3');
        });
    });

    describe('/track/metadata', () => {
        it('should respond with all track details', async () => {
            const track = encodeURIComponent('Ultra Violet');
            const artist = encodeURIComponent('Way out West');
            const response = await request(app).get(`/track/metadata?track=${track}&artist=${artist}`);
            expect(response.status).toBe(200);
        });

        it('should return the metadata for track ultra violet', async () => {
            const track = encodeURIComponent('Ultra Violet');
            const artist = encodeURIComponent('Way out West');
            const response = await request(app).get(`/track/metadata?track=${track}&artist=${artist}`);
            expect(response.body.name).toEqual('Ultra Violet');
        });

        it('should fail to find anything', async () => {
            const track = encodeURIComponent('sdfalsdkjfhasdlkjfbeb');
            const artist = encodeURIComponent('asflkjhsadf;hasdflkjhas asdfhasdfkhud');
            const response = await request(app).get(`/track/metadata?track=${track}&artist=${artist}`);
            expect(response.status).toBe(404);
        });

        it('should fail if the track is missing', async () => {
            const artist = encodeURIComponent('asflkjhsadf;hasdflkjhas asdfhasdfkhud');
            const response = await request(app).get(`/track/metadata?&artist=${artist}`);
            expect(response.status).toBe(422);
        });

        it('should give an error if track is missing', async () => {
            const artist = encodeURIComponent('asflkjhsadf;hasdflkjhas asdfhasdfkhud');
            const response = await request(app).get(`/track/metadata?&artist=${artist}`);
            expect(response.text).toBe('"track" is required');
        });
    });
});