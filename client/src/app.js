import React, {Component} from 'react';
import {connect} from 'react-redux';

import DeepWaterSection from './sections/deep-water-section';
import CollageSection from './sections/collage-section';
// import PhotoSection from './sections/photo-section';

class App extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <CollageSection />
                </div>
                <DeepWaterSection />
            </div>
        );
    }
}

export default connect()(App);
