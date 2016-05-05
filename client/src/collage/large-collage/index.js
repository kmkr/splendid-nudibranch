import React, {PropTypes} from 'react';

import TwoXTwoCollage from './two-x-two';
import {getCollage} from './collages';

import './large-collage.scss';

const LargeCollage = ({scroll}) => {
    const {availHeight} = scroll;

    const wrapperStyle = {
        height: `${availHeight}px`
    };

    const collage = getCollage();

    return (
        <div style={wrapperStyle}>
            <div id="large-collage">
                {collage.type === '2x2' ? <TwoXTwoCollage
                    collage={collage}
                    scroll={scroll} /> : null}

                <div className="link-wrapper">
                    <p>The Splendid Nudibranch</p>
                </div>
            </div>
        </div>
    );
};

LargeCollage.propTypes = {
    scroll: PropTypes.object.isRequired
};

export default LargeCollage;
