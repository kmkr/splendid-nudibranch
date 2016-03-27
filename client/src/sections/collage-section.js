import React, {Component} from 'react';
import {connect} from 'react-redux';

import SmallCollage from '../collage/small-collage';
import LargeCollage from '../collage/large-collage';

const threshold = 1200;

class CollageSection extends Component {
    render() {
        const {scroll} = this.props;
        return (
            <div id="collage-section">
                {scroll.innerWidth > threshold ?
                    <LargeCollage
                        scroll={scroll} /> :
                    <SmallCollage
                        scroll={scroll} />
                }
            </div>
        );
    }
}

function select(state) {
    return {
        scroll: state.scroll
    };
}

export default connect(select)(CollageSection);
