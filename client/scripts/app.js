import React, {Component} from 'react';
import {connect} from 'react-redux';

import PhotoUploader from './admin/photos/photo-uploader';
import ListPhotos from './photos/list-photos';
import {fetchPhotos} from './photos/photo-actions';

class App extends Component {
    componentWillMount() {
        this.props.dispatch(fetchPhotos());
    }

    render() {
        return (
            <div>
                <PhotoUploader />
                <ListPhotos photos={this.props.photos.data} />
            </div>
        );
    }
}

function select(state) {
    return {
        photos: state.photos
    };
}

export default connect(select)(App);
