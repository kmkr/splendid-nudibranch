import React, {Component} from 'react';
import {connect} from 'react-redux';

import CollageSection from './sections/collage-section';

import PhotoSection from './sections/photo-section';
import {setHistory} from './history/history-actions';
import {currentPage} from './sections/constants';

class App extends Component {
    componentWillMount() {
        this.props.dispatch(setHistory(currentPage()));
    }

    render() {
        return (
            <div>
                <CollageSection />
                <PhotoSection />
            </div>
        );
    }
}

function select(state) {
    return {
        history: state.history
    };
}

export default connect(select)(App);
