import React, {Component} from 'react';
import {connect} from 'react-redux';
import smoothScroll from 'smooth-scroll';

import './deep-water-section.scss';

function onClick(e) {
    e.preventDefault();
    smoothScroll.animateScroll('#app', null, {updateURL: false});
}

class DeepWaterSection extends Component {
    render() {
        return (
            <div id="deep-water-section">
                <a href="#" onClick={onClick}>Go to top</a>
            </div>
        );
    }
}

function select() {
    return {};
}

export default connect(select)(DeepWaterSection);
