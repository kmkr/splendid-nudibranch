import React, {PropTypes} from 'react';

import TransitionImage from '../../../transition-image';

const TwoXTwoItem = ({collageItem, scroll}) => {
    let imgStyle;

    if (scroll.innerWidth < 1700) {
        imgStyle = {
            width: '800px',
            marginTop: '-70px'
        };
    } else {
        imgStyle = {
            width: '1000px',
            marginTop: '-150px'
        };
    }
    return (
        <a href={`/#photos/${collageItem.key}`}>
            <TransitionImage
                style={imgStyle}
                src={collageItem.url} />
        </a>
    );
};

TwoXTwoItem.propTypes = {
    collageItem: PropTypes.object.isRequired,
    scroll: PropTypes.object.isRequired
};

export default TwoXTwoItem;
