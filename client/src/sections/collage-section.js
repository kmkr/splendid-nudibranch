import React, {Component} from 'react';
import {connect} from 'react-redux';

import Collage from '../collage';
import './collage-section.scss';

class CollageSection extends Component {
    render() {
        return (
            <div
                id="collage-section"
                style={{height: `${this.props.scroll.innerHeight}px`}}>
                <Collage />
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
