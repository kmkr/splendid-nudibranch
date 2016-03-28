import React, {Component} from 'react';
import {connect} from 'react-redux';
import SmoothScrollLink from '../history/smooth-scroll-link';

import './deep-water-section.scss';

class DeepWaterSection extends Component {
    render() {
        return (
            <div id="deep-water-section">
                <SmoothScrollLink
                    name="/"
                    selector="#app"
                    href="#">Go to top
                </SmoothScrollLink>
            </div>
        );
    }
}

function select() {
    return {};
}

export default connect(select)(DeepWaterSection);
