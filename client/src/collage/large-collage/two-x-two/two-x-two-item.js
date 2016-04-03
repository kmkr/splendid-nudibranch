import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {selectPhoto} from '../../../photos/photo-actions';
import SmoothScrollLink from '../../../history/smooth-scroll-link';
import TransitionImage from '../../../transition-image';

const TwoXTwoItem = ({collageItem, dispatch, scroll}) => {
    let imgStyle;

    if (scroll.innerWidth < 1700) {
        imgStyle = {
            width: '850px',
            marginTop: '-70px'
        };
    } else {
        imgStyle = {
            width: '1000px',
            marginTop: '-150px'
        };
    }
    return (
        <SmoothScrollLink
            onClick={() => {
                dispatch(selectPhoto(collageItem.key));
            }}
            href={`#photos/${collageItem.key}`}
            selector={`#photo-${collageItem.key}`}>
            <TransitionImage
                style={imgStyle}
                src={collageItem.url} />
        </SmoothScrollLink>
    );
};

TwoXTwoItem.propTypes = {
    collageItem: PropTypes.object.isRequired,
    scroll: PropTypes.object.isRequired
};

export default connect()(TwoXTwoItem);
