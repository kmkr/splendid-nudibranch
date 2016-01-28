import React, {Component} from 'react';
import {connect} from 'react-redux';

import PhotoUploader from './admin/photos/photo-uploader';
import {uploadPhoto} from './admin/photos/upload-photo-actions';
import ListPhotos from './photos/list-photos';
import {fetchPhotos} from './photos/photo-actions';

class App extends Component {
    componentWillMount() {
        this.props.dispatch(fetchPhotos());
    }

    onAddPhoto(photo) {
        this.props.dispatch(uploadPhoto(photo));
    }

    render() {
        return (
            <div>
                <PhotoUploader onAddPhoto={this.onAddPhoto.bind(this)} />
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
