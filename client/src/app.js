import React, {Component} from 'react';
import {connect} from 'react-redux';

import CollageSection from './sections/collage-section';
import DeepWaterSection from './sections/deep-water-section';
import MidWaterSection from './sections/mid-water-section';
import PhotoSection from './sections/photo-section';
import throttle from './scroll/throttler';
import {updatePosition, updateSize} from './scroll/scroll-actions';
import UrlUpdater from './history/url-updater';

class App extends Component {
    componentWillMount() {
        throttle('scroll', 'optimizedScroll');
        throttle('resize', 'optimizedResize');
        window.addEventListener('optimizedScroll', () => (
            this.props.dispatch(updatePosition())
        ));
        window.addEventListener('optimizedResize', () => (
            this.props.dispatch(updateSize())
        ));
    }

    componentDidMount() {
        this.props.dispatch(updatePosition());
        this.props.dispatch(updateSize());
    }

    render() {
        return (
            <div>
                <CollageSection />
                <PhotoSection />
                <MidWaterSection />
                <DeepWaterSection />
                <UrlUpdater />
            </div>
        );
    }
}

export default connect()(App);
