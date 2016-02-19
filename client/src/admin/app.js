import React, {Component} from 'react';
import {connect} from 'react-redux';

import PhotoUploader from './photos/photo-uploader';
import ListPhotos from './photos/list-photos';
import {updatePhoto, uploadPhoto, deletePhoto} from './photos/edit-photo-actions';
import {setTagsForPhoto} from './tags/edit-tags-actions';
import {fetchPhotos} from '../photos/photo-actions';

class App extends Component {
    componentWillMount() {
        this.props.dispatch(fetchPhotos());
    }

    onAddPhoto(photo) {
        this.props.dispatch(uploadPhoto(photo));
    }

    onDeleteClick(photo) {
        this.props.dispatch(deletePhoto(photo));
    }

    onUpdateClick(photo, updatedValues, updatedTags) {
        this.props.dispatch(updatePhoto(photo, updatedValues));
        this.props.dispatch(setTagsForPhoto(photo, updatedTags));
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-push-2 col-lg-10">
                    <h1>Upload photos</h1>
                    <PhotoUploader onAddPhoto={this.onAddPhoto.bind(this)} />
                    <hr />
                    <h1>Edit photos</h1>
                    <ListPhotos
                        photos={this.props.photos.data}
                        onDeleteClick={this.onDeleteClick.bind(this)}
                        onUpdateClick={this.onUpdateClick.bind(this)} />
                </div>
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
