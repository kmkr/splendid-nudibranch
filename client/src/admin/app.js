import React, {Component} from 'react';
import {connect} from 'react-redux';

import Authenticator from './authenticator';
import PhotoUploader from './photos/photo-uploader';
import BatchUpdatePhotos from './photos/batch-update-photos';
import ListPhotos from './photos/list-photos';
import {batchUpdatePhotos, uploadPhoto, deletePhoto} from './photos/edit-photo-actions';
import {fetchPhotos} from '../photos/photo-actions';
import snFetch from '../fetch';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        };
    }
    componentWillMount() {
        this.props.dispatch(fetchPhotos());
        snFetch.addHeaderRequestInterceptor(() => ({
            'x-auth': this.state.token
        }));
    }

    onAddPhoto(photo) {
        this.props.dispatch(uploadPhoto(photo));
    }

    onDeleteClick(photo) {
        this.props.dispatch(deletePhoto(photo));
    }

    onSetToken(token) {
        this.setState({token});
    }

    onBatchUpdatePhotos(photos) {
        if (photos.length) {
            this.props.dispatch(batchUpdatePhotos(photos));
        } else {
            console.log('Nothing to update');
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-push-2 col-lg-10">
                    <Authenticator onSetToken={this.onSetToken.bind(this)} />
                    <div style={{opacity: this.state.token ? 1 : 0.2}}>
                        <h1>Upload photos</h1>
                        <PhotoUploader onAddPhoto={this.onAddPhoto.bind(this)} />
                        <hr />
                        <h1>Batch update photos</h1>
                        <BatchUpdatePhotos photos={this.props.photos.data} onSubmit={this.onBatchUpdatePhotos.bind(this)} />
                        <hr />
                        <h1>Edit photos</h1>
                        <ListPhotos
                            photos={this.props.photos.data}
                            onDeleteClick={this.onDeleteClick.bind(this)} />
                    </div>
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
