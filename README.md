[![Build Status](https://travis-ci.org/kmkr/splendid-nudibranch.svg?branch=master)](https://travis-ci.org/kmkr/splendid-nudibranch)

## Upload photos

Set env variables:

export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...

Install graphics magick:

```
suco apt install graphicsmagick
```

Upload by running:

```
node photo-management/upload/upload.js <file path 1> <file path 2> <...>
```

## Update content

The content on the page is fetched from the db, but a copy in the repository exists too. The db will perhaps be removed in the future.

Ensure the local copy is up to date by running:

```
node photo-management/pull-content.js
```

Update content at will. If you want to sync to the db, run:

```
node photo-management/update-content.js
```

To delete a photo, remove the entry in `content.json` and run the same command with "--delete" appended:

```
node photo-management/updatePhotos.js --delete
```
