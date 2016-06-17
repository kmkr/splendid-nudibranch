import React, {Component, PropTypes} from 'react';
import Vivus from 'vivus';

import './small-collage.scss';

class SmallCollage extends Component {
    componentDidMount() {
        new Vivus('logo', {duration: 60}); // eslint-disable-line no-new
    }
    render() {
        const {scroll} = this.props;

        const style = {
            height: `${scroll.availHeight}px`
        };
        return (
            <div
                style={style}
                id="small-collage">

                <object
                    id="logo"
                    type="image/svg+xml"
                    data="/static/images/logo-square.svg" />

                <p>THE SPLENDID NUDIBRANCH</p>
            </div>
        );
    }
}

SmallCollage.propTypes = {
    scroll: PropTypes.object.isRequired
};

export default SmallCollage;
