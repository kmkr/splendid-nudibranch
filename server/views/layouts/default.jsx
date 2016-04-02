import React from 'react';
import Style from './style';

const Layout = ({children, keywords}) => (
    <html>
        <head>
            <title>The Splendid Nudibranch</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="description" content="Author: Kris-Mikael Krister, Illustrator: Hilde D. Johannessen" />
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
