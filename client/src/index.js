/** @jsx h */
import {h, render} from 'preact';

import Collage from './collage';

const photos = window.snPhotos;

render((
    <div className="container-fluid">
        <Collage photos={photos} />
    </div>
), document.getElementById('app'));
