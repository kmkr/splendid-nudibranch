import React from 'react';
import smoothScroll from 'smooth-scroll';

function onClick(e) {
    e.preventDefault();
    smoothScroll.animateScroll('#photo-section');
}

const Collage = () => (
    <div>
        <div>Collage inc</div>
        <a href="#" onClick={onClick}>All photos</a>
    </div>
);

export default Collage;
