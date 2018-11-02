# Music Library

Node express API for serving songs and songs metadata

## Prerequisites

-   node v10+

## Environment Variables

To use the API, access to an S3 bucket and a last FM API key required.  Set the following environment variables before starting:

-   AWS_SECRET_ACCESS_KEY
-   AWS_ACCESS_KEY_ID
-   S3_BUCKET
-   LAST_FM_KEY
-   PORT (optional)

## Development

Install all the dependencies

```bash
npm install
```

Start the app

```bash
npm start
```

### Testing

Run the unit tests 

```bash
npm run test:unit
```

Run the end to end tests.  This requires setting the environment variables (see the top of the readme)

```bash
npm run test:end-to-end
```

## Production

Build the app

```bash
npm run build
```

Start the built app

```bash
npm run serve
```

## API endpoints

### GET /

Returns 200 if the API is up

### GET /tracks

Returns a list of available tracks with album, track name and length
and other associated metadata

Example JSON body:

```json
[{
    "track": "Don't stop believing",
    "artist": "Journey",
    "album": "Journey album"
    ...
}]
```

### GET /track/:id/stream

Get signed streaming url valid for 15 minutes

#### URL parameters

-   id: unique track id

#### Example response for track stream

text/html

```curl
https://bucket-name.s3-us-west-2.amazonaws.com/file-name.pdf?AWSAccessKeyId=[access-key-omitted]&Expires=1470666057&Signature=[signature-omitted]
```

### GET /track/metadata

Get metadata for a particular track

#### Query parameters

-   track: track name
-   artist: track artist

#### Example response for track metadata

json/javascript

```json
{  
   "name":"Alberta",
   "mbid":"491ffbea-db4a-40bc-82af-e0eb408ee326",
   "url":"https://www.last.fm/music/Eric+Clapton/_/Alberta",
   "duration":"222000",
   "streamable":{  
      "#text":"0",
      "fulltrack":"0"
   },
   "listeners":"150429",
   "playcount":"436047",
   "artist":{  
      "name":"Eric Clapton",
      "mbid":"618b6900-0618-4f1e-b835-bccb17f84294",
      "url":"https://www.last.fm/music/Eric+Clapton"
   },
   "album":{  
      "artist":"Eric Clapton",
      "title":"Unplugged",
      "mbid":"fa84b81a-6d02-4d89-a515-9a6ef6df11a3",
      "url":"https://www.last.fm/music/Eric+Clapton/Unplugged",
      "image":[  
         {  
            "#text":"https://lastfm-img2.akamaized.net/i/u/34s/f7e2c3b44db14a9a90bd4f2927e4e2be.png",
            "size":"small"
         },
         {  
            "#text":"https://lastfm-img2.akamaized.net/i/u/64s/f7e2c3b44db14a9a90bd4f2927e4e2be.png",
            "size":"medium"
         },
         {  
            "#text":"https://lastfm-img2.akamaized.net/i/u/174s/f7e2c3b44db14a9a90bd4f2927e4e2be.png",
            "size":"large"
         },
         {  
            "#text":"https://lastfm-img2.akamaized.net/i/u/300x300/f7e2c3b44db14a9a90bd4f2927e4e2be.png",
            "size":"extralarge"
         }
      ],
      "@attr":{  
         "position":"10"
      }
   },
   "toptags":{  
      "tag":[  
         {  
            "name":"blues",
            "url":"https://www.last.fm/tag/blues"
         },
         {  
            "name":"classic rock",
            "url":"https://www.last.fm/tag/classic+rock"
         },
         {  
            "name":"blues rock",
            "url":"https://www.last.fm/tag/blues+rock"
         },
         {  
            "name":"eric clapton",
            "url":"https://www.last.fm/tag/eric+clapton"
         },
         {  
            "name":"rock",
            "url":"https://www.last.fm/tag/rock"
         }
      ]
   }
}
```
