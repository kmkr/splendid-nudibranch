import React, {Component} from 'react';
import smoothScroll from 'smooth-scroll';

import './small-collage.scss';
import './arrow.scss';

class SmallCollage extends Component {
    scrollToPhotoSection() {
        smoothScroll.animateScroll('#photo-section', null, {
            updateURL: false
        });
    }

    render() {
        return (
            <div id="small-collage">
                <div>
                    <object
                        id="logo"
                        type="image/svg+xml"
                        data="/static/images/logo.svg"/>
                    <img className="title-image" src="/static/images/title.svg"/>
                </div>
                <div className="arrow bounce" onClick={this.scrollToPhotoSection}/>
            </div>
        );
    }
}

export default SmallCollage;
