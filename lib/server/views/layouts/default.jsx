import React from 'react'
import License from './license'
import ogTags from './og-tags'

import {description} from '../../../common/constants'

const Layout = ({children, photos, keywords, selectedPhotoKey, year, location}) => (
  <html>
    <head>
      <title>The Splendid Nudibranch</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
      {keywords && <meta name='keywords' content={keywords} />}
      <meta name='description' content={`Author: Kris-Mikael Krister, Illustrator: Hilde. D. Johannessen, ${description}`} />
      <link rel='stylesheet' href='/static/app.css' />
      {Object.entries(ogTags(photos, {selectedPhotoKey, year, location})).map(entry => (
        <meta
          key={entry[0]}
          property={entry[0]}
          content={entry[1]} />
            ))}

    </head>
    <body>
      <License />
      {children}
    </body>
  </html>
)

export default Layout
