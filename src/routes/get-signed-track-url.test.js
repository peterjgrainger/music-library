import trackUrl from './get-signed-track-url';


describe('src/routes/get-full-library', () => {
    const res = {
        send: jest.fn()
    };

    const req = {
        params: {
            id: encodeURIComponent('Way Out West/We Love Machine/Ultra Violet.mp3')
        },
        s3: {
            getSignedUrl: () => 'signedUrl'
        }
    };

    it('should return a signed url', () => {
        trackUrl(req, res);
        expect(res.send.mock.calls[0][0]).toBe('signedUrl');
    });
});