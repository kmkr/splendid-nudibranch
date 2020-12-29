[![Build Status](https://travis-ci.org/kmkr/splendid-nudibranch.svg?branch=master)](https://travis-ci.org/kmkr/splendid-nudibranch)

## Upload

1. Set these env variables

export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
export SN_S3_BASE=https://s3.eu-central-1.amazonaws.com
export SN_S3_BUCKET_NAME=splendid-nudibranch

2. Install graphics magick

```
suco apt install graphicsmagick
```

3. Upload with

```
node photo-management/upload/upload.js <file path 1> <file path 2> <...>
```

## Dump content

Dump from db by running:

```
node photo-management/dumpPhotos.js
```

## Update based on changes in content.json

Update server based on local content:

```
node photo-management/updatePhotos.js
```

Add "--delete" to delete from server based on local content.

```
node photo-management/updatePhotos.js --delete
```
