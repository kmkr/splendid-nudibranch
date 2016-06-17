import React, {Component, PropTypes} from 'react';
import Vivus from 'vivus';

import TwoXTwoItem from './two-x-two-item';
import './two-x-two-collage.scss';

const logoSize = 250;
const logoStyle = {
    zIndex: 1000,
    position: 'absolute',
    width: `${logoSize}px`,
    height: `${logoSize}px`,
    top: '50%',
    left: '50%',
    marginLeft: `-${logoSize / 2}px`,
    marginTop: `-${logoSize / 2}px`
};

class TwoXTwoCollage extends Component {
    componentDidMount() {
        new Vivus('logo', {duration: 60}); // eslint-disable-line no-new
    }

    render() {
        const {collage, scroll} = this.props;
        const {innerHeight} = scroll;

        const SOME_SLACK = 10;
        const MAX_HEIGHT_PER_IMAGE = 666;
        const height = Math.min(innerHeight / 2 - SOME_SLACK, MAX_HEIGHT_PER_IMAGE);
        const cropStyle = {height};

        return (
            <div id="two-x-two-collage">
                <object
                    style={logoStyle}
                    id="logo"
                    type="image/svg+xml"
                    data="/static/images/logo-round.svg" />
                {collage.items.map(item => (
                    <div key={item.key}
                         className="crop-wrapper">
                        <div
                            className="cropper"
                            style={cropStyle}>
                            <TwoXTwoItem
                                collageItem={item}
                                scroll={scroll} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

TwoXTwoCollage.propTypes = {
    collage: PropTypes.object.isRequired,
    scroll: PropTypes.object.isRequired
};

export default TwoXTwoCollage;
