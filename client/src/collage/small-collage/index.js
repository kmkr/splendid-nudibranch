import React, {Component} from 'react';
import Vivus from 'vivus';
import smoothScroll from 'smooth-scroll';

import './small-collage.scss';
import './pulsating-arrow.scss';

class SmallCollage extends Component {
    componentDidMount() {
        new Vivus('logo', {duration: 60}); // eslint-disable-line no-new
    }

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
                        data="/static/images/logo-square.svg"/>
                    <img className="title-image" src="/static/images/title.svg"/>
                </div>
                <svg className="arrows" onClick={this.scrollToPhotoSection}>
                    <path className="a1" d="M0 0 L30 32 L60 0"></path>
                    <path className="a2" d="M0 20 L30 52 L60 20"></path>
                    <path className="a3" d="M0 40 L30 72 L60 40"></path>
                </svg>
            </div>
        );
    }
}

export default SmallCollage;
