import React, {PropTypes} from 'react';

import TransitionImage from '../../../transition-image';
import TwoXTwoItem from './two-x-two-item';
import './two-x-two-collage.scss';

const TwoXTwoCollage = ({collage, scroll}) => {
    const {availHeight, innerWidth} = scroll;

    const SOME_SLACK = 50;
    const cropStyle = {
        height: `${availHeight / 2 - SOME_SLACK}px`
    };

    const logoSize = 250;
    const padding = 8; // From .SCSS
    const logoStyle = {
        position: 'absolute',
        width: `${logoSize}px`,
        height: `${logoSize}px`,
        top: `${(availHeight / 2) - (logoSize / 2) - (padding * 2) - (SOME_SLACK / 2)}px`,
        left: `${(innerWidth / 2) - (logoSize / 2) - padding}px`
    };

    return (
        <div id="two-x-two-collage">
            {collage.items.map(item => (
                <div
                    key={item.key}
                    className="cropper"
                    style={cropStyle}>
                    <TwoXTwoItem
                        collageItem={item}
                        scroll={scroll} />
                </div>
            ))}
            <TransitionImage
                style={logoStyle}
                src="/static/images/logo-round.svg" />
        </div>
    );
};

TwoXTwoCollage.propTypes = {
    collage: PropTypes.object.isRequired,
    scroll: PropTypes.object.isRequired
};

export default TwoXTwoCollage;
