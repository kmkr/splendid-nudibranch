import React, {Component} from 'react';
import {connect} from 'react-redux';

import Collage from './collage';
import ListPhotos from './photos/list-photos';
import {fetchPhotos} from './photos/photo-actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: this.getPage()
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchPhotos());

        window.onhashchange = () => {
            this.setState({
                page: this.getPage()
            });
        };
    }

    getPage() {
        return /photos/.test(window.location.hash) ? 'photos' : 'collage';
    }

    render() {
        return (
            this.state.page === 'collage' ?
                <Collage /> :
                <ListPhotos photos={this.props.photos.data} />
        );
    }
}

function select(state) {
    return {
        photos: state.photos
    };
}

export default connect(select)(App);
