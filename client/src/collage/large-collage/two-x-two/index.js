import React, {Component, PropTypes} from 'react';

import TwoXTwoItem from './two-x-two-item';
import './two-x-two-collage.scss';

class TwoXTwoCollage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoLoaded: false
        };
    }

    render() {
        const {collage, scroll, itemClicked} = this.props;
        const {innerHeight, innerWidth} = scroll;

        const cropStyle = {
            height: `${innerHeight / 2 - 30}px`
        };

        const logoSize = 250;
        const padding = 10;
        const logoStyle = {
            position: 'absolute',
            width: `${logoSize}px`,
            height: `${logoSize}px`,
            top: `${(innerHeight / 2) - (logoSize / 2) - (padding * 2)}px`,
            left: `${(innerWidth / 2) - (logoSize / 2) - padding}px`,
            opacity: this.state.logoLoaded ? 1 : 0
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
                            scroll={scroll}
                            itemClicked={itemClicked} />
                    </div>
                ))}
                <img
                    style={logoStyle}
                    onLoad={() => this.setState({logoLoaded: true})}
                    src="/static/images/logo-round.svg" />
            </div>
        );
    }
}

TwoXTwoCollage.propTypes = {
    collage: PropTypes.object.isRequired,
    scroll: PropTypes.object.isRequired,
    itemClicked: PropTypes.func.isRequired
};

export default TwoXTwoCollage;
