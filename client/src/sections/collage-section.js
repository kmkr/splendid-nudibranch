import React, {Component} from 'react';
import {connect} from 'react-redux';

import SmallCollage from '../collage/small-collage';
import LargeCollage from '../collage/large-collage';

const threshold = 1200;

class CollageSection extends Component {
    render() {
        // todo: fix with media query?
        const {innerWidth} = this.props;
        return (
            <div id="collage-section">
                {innerWidth > threshold ?
                    <LargeCollage /> :
                    <SmallCollage />
                }
            </div>
        );
    }
}

function select(state) {
    return {
        innerWidth: state.scroll.innerWidth
    };
}

export default connect(select)(CollageSection);
