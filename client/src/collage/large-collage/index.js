import React, {PropTypes} from 'react';

import TwoXTwoCollage from './two-x-two';
import {getCollage} from './collages';

import './large-collage.scss';

const LargeCollage = ({scroll}) => {
    const {innerHeight} = scroll;

    const wrapperStyle = {
        height: `${innerHeight}px`
    };

    const collage = getCollage();

    return (
        <div style={wrapperStyle}>
            <div id="large-collage">
                {collage && collage.type === '2x2' ? <TwoXTwoCollage
                    collage={collage}
                    scroll={scroll} /> : null}
            </div>
        </div>
    );
};

LargeCollage.propTypes = {
    scroll: PropTypes.object.isRequired
};

export default LargeCollage;
