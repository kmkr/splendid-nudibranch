import React, {Component} from 'react';
import {connect} from 'react-redux';

import Collage from '../collage';

class CollagePage extends Component {
    render() {
        return (
            <Collage />
        );
    }
}

function select() {
    return {};
}

export default connect(select)(CollagePage);
