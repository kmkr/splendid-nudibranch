import React, {PropTypes} from 'react';

import './large-collage.scss';
import collages from './collages';

function delegate(e, delegatee, ...rest) {
    e.preventDefault();
    delegatee(...rest);
}

const LargeCollage = ({scroll, itemClicked, photoLinkClicked}) => {
    const {innerHeight, innerWidth} = scroll;

    const wrapperStyle = {
        height: `${innerHeight}px`
    };

    const cropStyle = {
        height: `${innerHeight / 2 - 30}px`
    };

    const imgStyle = {
        marginTop: '-50px'
    };

    if (innerWidth < 1700) {
        imgStyle.width = '800px';
    }

    const logoSize = 250;
    const padding = 10;
    const logoStyle = {
        position: 'absolute',
        width: `${logoSize}px`,
        height: `${logoSize}px`,
        top: `${(innerHeight / 2) - (logoSize / 2) - (padding * 2)}px`,
        left: `${(innerWidth / 2) - (logoSize / 2) - padding}px`
    };

    return (
        <div style={wrapperStyle}>
            <div id="large-collage">
                <div className="collage-row">
                    <div className="cropper" style={cropStyle}>
                        <img
                            onClick={e => delegate(e, itemClicked, 'ea89-63b3')}
                            style={imgStyle}
                            src="https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/ce27-4b9e/s_DSC02971.jpg" />
                    </div>
                    <div className="cropper" style={cropStyle}>
                        <img
                            onClick={e => delegate(e, itemClicked, 'ea89-63b3')}
                            style={imgStyle}
                            src="https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/ce27-4b9e/s_DSC02971.jpg" />
                    </div>
                </div>
                <div className="collage-row">
                    <div className="cropper" style={cropStyle}>
                        <img
                            onClick={e => delegate(e, itemClicked, 'ea89-63b3')}
                            style={imgStyle}
                            src="https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/ce27-4b9e/s_DSC02971.jpg" />
                    </div>
                    <div className="cropper" style={cropStyle}>
                        <img
                            onClick={e => delegate(e, itemClicked, 'ea89-63b3')}
                            style={imgStyle}
                            src="https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/ce27-4b9e/s_DSC02971.jpg" />
                    </div>
                </div>
                <img style={logoStyle} src="/static/images/logo-round.svg" />

                <a href="#" onClick={e => delegate(e, photoLinkClicked)}>The Splendid Nudibranch</a>
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
