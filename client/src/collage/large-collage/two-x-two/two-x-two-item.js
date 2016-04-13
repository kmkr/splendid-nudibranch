import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {selectPhoto} from '../../../photos/photo-actions';
import SmoothScrollLink from '../../../history/smooth-scroll-link';
import TransitionImage from '../../../transition-image';

function getImgStyle(innerWidth, styles) {
    if (innerWidth > 1700) {
        return {
            width: '1000px',
            marginTop: `${styles.wide.top || 0}px`,
            marginLeft: `${styles.wide.left || 0}px`
        };
    }

    return {
        width: '850px',
        marginTop: `${styles.medium.top || 0}px`,
        marginLeft: `${styles.medium.left || 0}px`
    };
}

const TwoXTwoItem = ({collageItem, dispatch, scroll}) => {
    return (
        <SmoothScrollLink
            onClick={() => {
                dispatch(selectPhoto(collageItem.key));
            }}
            href={`#photos/${collageItem.key}`}
            selector={`#photo-${collageItem.key}`}>
            <TransitionImage
                style={getImgStyle(scroll.innerWidth, collageItem.styles)}
                src={collageItem.url} />
        </SmoothScrollLink>
    );
};

TwoXTwoItem.propTypes = {
    collageItem: PropTypes.object.isRequired,
    scroll: PropTypes.object.isRequired
};

export default connect()(TwoXTwoItem);
