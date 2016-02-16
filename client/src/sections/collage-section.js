import React, {Component} from 'react';
import {connect} from 'react-redux';

import Collage from '../collage';

class CollagePage extends Component {
    render() {
        return (
            <div style={{height: `${this.props.scroll.innerHeight}px`}}>
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

export default connect(select)(CollagePage);
