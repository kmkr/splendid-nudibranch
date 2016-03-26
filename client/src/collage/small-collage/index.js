import React, {PropTypes} from 'react';

import './small-collage.scss';

const SmallCollage = ({scroll}) => {
    const style = {
        height: `${scroll.innerHeight}px`
    };
    return (
        <div
            style={style}
            id="small-collage">

            <img src="/static/images/logo-square.svg" />

            <p>THE SPLENDID NUDIBRANCH</p>
        </div>
    );
};

SmallCollage.propTypes = {
    scroll: PropTypes.object.isRequired
};

export default SmallCollage;
