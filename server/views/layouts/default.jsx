import React from 'react';
import Style from './style';
import ogTags from './og-tags';

const Layout = ({children, data, keywords, selectedPhotoKey}) => (
    <html>
        <head>
            <title>The Splendid Nudibranch</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="description" content="Author: Kris-Mikael Krister, Illustrator: Hilde D. Johannessen" />
            {Object.entries(ogTags(data, selectedPhotoKey)).map(entry => (
                <meta
                    key={entry[0]}
                    property={entry[0]}
                    content={entry[1]} />
            ))}
            <link
                href="https://fonts.googleapis.com/css?family=Raleway:400,700|Quicksand"
                rel="stylesheet"
                type="text/css" />

            <Style />
        </head>
        <body className="container-fluid">
            {children}
        </body>
    </html>
);

export default Layout;
