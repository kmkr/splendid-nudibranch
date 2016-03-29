import React from 'react';
import {connect} from 'react-redux';
import SmoothScrollLink from '../history/smooth-scroll-link';

import './deep-water-section.scss';

const DeepWaterSection = ({photos}) => {
    const somePhotoLoading = photos.data.some(photo => !photo.loaded);
    return (
        <div id="deep-water-section">
            {somePhotoLoading ?
                <div className="spinner" /> :
                <SmoothScrollLink
                    name="/"
                    selector="#app"
                    href="#">Go to top
                </SmoothScrollLink>
            }
        </div>
    );
};

function select(state) {
    return {
        photos: state.photos
    };
}

export default connect(select)(DeepWaterSection);
