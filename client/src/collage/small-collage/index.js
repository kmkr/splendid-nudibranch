import React, {Component} from 'react';
import smoothScroll from 'smooth-scroll';

import './small-collage.scss';
import './arrow.scss';

class SmallCollage extends Component {
    shouldComponentUpdate() {
        return false;
    }

    scrollToPhotoSection() {
        smoothScroll.animateScroll('#photo-section', null, {
            updateURL: false
        });
    }

    render() {
        return (
            <div id="small-collage" onClick={this.scrollToPhotoSection}>
                <div>
                    <img
                        id="logo"
                        src="/static/images/logo.svg"/>
                    <img className="title-image" src="/static/images/title.svg"/>
                </div>
                <div className="arrow bounce"/>
            </div>
        );
    }
}

export default SmallCollage;
