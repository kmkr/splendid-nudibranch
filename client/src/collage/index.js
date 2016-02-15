import React, {PropTypes} from 'react';

const Collage = ({onLinkClick}) => (
    <div>
        Collage inc
        <a href="/photos" onClick={onLinkClick}>All photos</a>
    </div>
);

Collage.propTypes = {
    onLinkClick: PropTypes.func.isRequired
};

export default Collage;
