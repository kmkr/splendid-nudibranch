import React, {Component} from 'react';
import {connect} from 'react-redux';

import CollagePage from './pages/collage-page';

import PhotoPage from './pages/photo-page';
import {fetchPhotos} from './photos/photo-actions';
import {popHistory, setHistory} from './history/history-actions';

import {currentPage, PAGES} from './pages/constants';

class App extends Component {
    componentWillMount() {
        this.props.dispatch(fetchPhotos());
        this.props.dispatch(setHistory(currentPage()));
        window.addEventListener('popstate', () => {
            this.props.dispatch(popHistory(currentPage()));
        });
    }

    render() {
        return (
            this.props.history.url === PAGES.PHOTOS.url ?
                <PhotoPage /> :
                <CollagePage />
        );
    }
}

function select(state) {
    return {
        history: state.history
    };
}

export default connect(select)(App);
