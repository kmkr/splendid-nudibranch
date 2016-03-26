import React, {PropTypes} from 'react';

import TwoXTwoCollage from './two-x-two';
import {getCollage} from './collages';

import './large-collage.scss';

function delegate(e, delegatee, ...rest) {
    e.preventDefault();
    delegatee(...rest);
}

const LargeCollage = ({scroll, itemClicked, photoLinkClicked}) => {
    const {innerHeight} = scroll;

    const wrapperStyle = {
        height: `${innerHeight}px`
    };

    const collage = getCollage();

    return (
        <div style={wrapperStyle}>
            <div id="large-collage">
                {collage.type === '2x2' ? <TwoXTwoCollage
                    collage={collage}
                    scroll={scroll}
                    itemClicked={itemClicked} /> : null}

                <div className="link-wrapper">
                    <a href="#" onClick={e => delegate(e, photoLinkClicked)}>The Splendid Nudibranch</a>
                </div>
            </div>
        </div>
    );
};

LargeCollage.propTypes = {
    scroll: PropTypes.object.isRequired,
    itemClicked: PropTypes.func.isRequired,
    photoLinkClicked: PropTypes.func.isRequired
};

export default LargeCollage;
