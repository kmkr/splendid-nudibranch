import React from 'react';
import Style from './style';
import License from './license';
import ogTags from './og-tags';

import {description} from '../../../common/constants';

const Layout = ({children, photos, keywords, selectedPhotoKey, year, location}) => (
    <html>
        <head>
            <title>The Splendid Nudibranch</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="description" content={`Author: Kris-Mikael Krister, Illustrator: Hilde. D. Johannessen, ${description}`} />
            <link rel="stylesheet" href="/static/app.css"/>
            {Object.entries(ogTags(photos, {selectedPhotoKey, year, location})).map(entry => (
                <meta
                    key={entry[0]}
                    property={entry[0]}
                    content={entry[1]} />
            ))}
            <link
                href="https://fonts.googleapis.com/css?family=Raleway:300,600"
                rel="stylesheet"
                type="text/css" />

            <link
                rel="icon"
                type="image/png"
                href="/static/images/favicon-100.png"
                sizes="100x100" />
            <link
                rel="icon"
                type="image/png"
                href="/static/images/favicon-192.png"
                sizes="192x192" />
            <link
                rel="icon"
                href="/static/images/favicon.ico"
                sizes="32x32" />
            <Style />
        </head>
        <body>
            <License />
            {children}
        </body>
    </html>
);

export default Layout;
