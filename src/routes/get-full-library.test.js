import getFullLibrary from './get-full-library';


describe('src/routes/get-full-library', () => {
    const res = {
        json: jest.fn()
    };

    const req = {
        config: {
            S3_BUCKET: 'pg-music'
        },
        s3: {
            listObjects: () => ({
                promise: () => Promise.resolve({
                    Contents: [ {
                        Key: 'someArtist/someAlbum/someTrack'
                    } ]
                })
            })


        }
    };

    it('should return a list of objects', async () => {
        await getFullLibrary(req, res, ()=> {});
        expect(res.json.mock.calls[0][0]).toEqual([ {
            id: 'someArtist%2FsomeAlbum%2FsomeTrack',
            artist: 'someArtist',
            track: 'someTrack',
            album: 'someAlbum'
        } ]);
    });

    it('should return a list of objects', async () => {
        req.s3.listObjects = () => ({
            promise: () => Promise.reject('some failure happened')
        });
        const next = jest.fn();
        await getFullLibrary(req, res, next);
        expect(next).toHaveBeenCalledWith('some failure happened');
    });
});