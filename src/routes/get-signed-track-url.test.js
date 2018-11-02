import trackUrl from './get-signed-track-url';


describe('src/routes/get-full-library', () => {
    const res = {
        send: jest.fn()
    };

    const req = {
        config: {
            S3_BUCKET: 'pg-music'
        },
        params: {
            id: encodeURIComponent('Way Out West/We Love Machine/Ultra Violet.mp3')
        },
        s3: {
            getSignedUrl: () => 'signedUrl'
        }
    };

    it('should return a signed url', () => {
        trackUrl(req, res);
        expect(res.send.mock.calls[0][0]).toContain('signedUrl');
    });
});