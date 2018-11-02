import  getMetadata from './get-metadata';


describe('src/routes/get-full-library', () => {
    const res = {
        json: jest.fn(),
        status: jest.fn()
    };

    const req = {
        query: {
            track: encodeURIComponent('The Last Ship'),
            artist: encodeURIComponent('Sting')
        },
        config: {
            LAST_FM_KEY: process.env.LAST_FM_KEY
        },
        onwardRequest: {
            get: () => Promise.resolve(JSON.stringify({
                track: {
                    name: 'The Last Ship'
                }
            }))
        }
    };

    it('should return the metadata for a track', async () => {
        await getMetadata(req, res, ()=> {});
        const metadata = res.json.mock.calls[0][0];

        expect(metadata.name).toBe('The Last Ship');
    });

    it('should return 404 if not found', async () => {
        req.onwardRequest.get = () => Promise.resolve(JSON.stringify({
            error: 6,
            message: 'not found'
        }));
        await getMetadata(req, res, ()=> {});
        expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should fail when the promise fails', async () => {
        const next = jest.fn();
        req.onwardRequest.get = () => Promise.reject('some error');

        await getMetadata(req, res, next);

        expect(next).toHaveBeenCalledWith('some error');
    });
});