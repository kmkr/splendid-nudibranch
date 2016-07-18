import React from 'react';

import TwoXTwoCollage from './two-x-two';
import {getCollage} from './collages';

import './large-collage.scss';

const LargeCollage = () => {
    const collage = getCollage();

    return (
        <div id="large-collage">
            {collage && collage.type === '2x2' ? <TwoXTwoCollage
                collage={collage}
                scroll={scroll} /> : null}
        </div>
    );
};

export default LargeCollage;
