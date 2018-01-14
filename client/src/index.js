import React from 'react';
import ReactDOM from 'react-dom';

import Collage from './collage';

const photos = window.snPhotos;

ReactDOM.render((
    <div className="container-fluid">
        <Collage photos={photos} />
    </div>
), document.getElementById('app'));
