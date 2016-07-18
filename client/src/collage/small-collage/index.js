import React, {Component} from 'react';
import Vivus from 'vivus';

import './small-collage.scss';

class SmallCollage extends Component {
    componentDidMount() {
        new Vivus('logo', {duration: 60}); // eslint-disable-line no-new
    }
    render() {
        return (
            <div id="small-collage">
                <object
                    id="logo"
                    type="image/svg+xml"
                    data="/static/images/logo-square.svg" />

                <p>THE SPLENDID NUDIBRANCH</p>
            </div>
        );
    }
}

export default SmallCollage;
