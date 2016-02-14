import React, {Component} from 'react';
import {connect} from 'react-redux';

import Collage from './collage';
import Search from './search';
import PhotoScroller from './photos/photo-scroller';
import {fetchPhotos} from './photos/photo-actions';
import {popHistory, pushHistory, setHistory} from './history/history-actions';
import {currentPage, PAGES} from './pages';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(fetchPhotos());
        this.props.dispatch(setHistory(currentPage()));
        window.addEventListener('popstate', () => {
            this.props.dispatch(popHistory(currentPage()));
        });
    }

    onCollageLinkClick(e) {
        e.preventDefault();
        this.props.dispatch(pushHistory(PAGES.PHOTOS));
    }

    render() {
        return (
            <div>
                <Search photos={this.props.photos.data} />
                <div className="col-sm-offset-2">
                    {this.props.history.url === PAGES.PHOTOS.url ?
                        <PhotoScroller photos={this.props.photos.data} /> :
                        <Collage onLinkClick={this.onCollageLinkClick.bind(this)} />
                    }
                </div>
            </div>
        );
    }
}

function select(state) {
    return {
        photos: state.photos,
        history: state.history
    };
}

export default connect(select)(App);
