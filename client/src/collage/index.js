import React from 'react';
import smoothScroll from 'smooth-scroll';

function onClick(e) {
    e.preventDefault();
    smoothScroll.animateScroll('#photo-section', null, {updateURL: false});
}

const Collage = () => (
    <div>
        <div>Collage inc</div>
        <a href="#" onClick={onClick}>All photos</a>
    </div>
);

export default Collage;
