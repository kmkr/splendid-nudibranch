import React from 'react';
import {connect} from 'react-redux';
import SmoothScrollLink from '../navigation/smooth-scroll-link';

import './deep-water-section.scss';

const DeepWaterSection = ({photos}) => {
    const somePhotoLoading = photos.data.some(photo => !photo.loaded);

    return (
        <div id="deep-water-section">
            {somePhotoLoading ?
                <div className="spinner-wrapper"><div className="spinner" /></div> :

                <div>
                    <img className="barracuda" src="/static/images/barracuda.svg" />
                    <img className="anemone" src="/static/images/anemone.svg" />
                    <div className="jellyfish-wrapper">
                        <img className="jellyfish" src="/static/images/jellyfish.svg" />
                    </div>

                    <div className="drop-your-weights-wrapper">
                            <SmoothScrollLink
                                speed={4000}
                                easing="easeOutCubic"
                                name="/"
                                selector="#app"
                                href="#">DROP YOUR WEIGHTS
                            </SmoothScrollLink>

                    </div>
                </div>
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
