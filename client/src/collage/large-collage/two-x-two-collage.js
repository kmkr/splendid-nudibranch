import React, {PropTypes} from 'react';

import './two-x-two-collage.scss';

function delegate(e, delegatee, ...rest) {
    e.preventDefault();
    delegatee(...rest);
}

const TwoXTwoCollage = ({collage, scroll, itemClicked}) => {
    const {innerHeight, innerWidth} = scroll;

    const cropStyle = {
        height: `${innerHeight / 2 - 30}px`
    };

    let imgStyle;

    if (innerWidth < 1700) {
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
        <div id="two-x-two-collage">
            {collage.items.map(item => (
                <div
                    key={item.key}
                    className="cropper"
                    style={cropStyle}>
                    <img
                        onClick={e => delegate(e, itemClicked, item.key)}
                        style={imgStyle}
                        src={item.url} />
                </div>
            ))}
            <img style={logoStyle} src="/static/images/logo-round.svg" />
        </div>
    );
};

TwoXTwoCollage.propTypes = {
    collage: PropTypes.object.isRequired,
    scroll: PropTypes.object.isRequired,
    itemClicked: PropTypes.func.isRequired
};

export default TwoXTwoCollage;
