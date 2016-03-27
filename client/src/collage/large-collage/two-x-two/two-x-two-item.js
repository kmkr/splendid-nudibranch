import React, {PropTypes} from 'react';

import TransitionImage from '../../../transition-image';

function delegate(e, delegatee, ...rest) {
    e.preventDefault();
    delegatee(...rest);
}

const TwoXTwoItem = ({itemClicked, collageItem, scroll}) => {
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
        <TransitionImage
            onClick={e => delegate(e, itemClicked, collageItem.key)}
            style={imgStyle}
            src={collageItem.url} />
    );
};

TwoXTwoItem.propTypes = {
    collageItem: PropTypes.object.isRequired,
    itemClicked: PropTypes.func.isRequired,
    scroll: PropTypes.object.isRequired
};

export default TwoXTwoItem;
