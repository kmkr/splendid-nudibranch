import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import TitleBar from '../photos/title-bar';
import {photoLoaded, fetchPhotos} from '../photos/photo-actions';
import PhotoScroller from '../photos/photo-scroller';
import {postStats, beaconStats} from '../statistics';

import './photo-section.scss';

class PhotoSection extends PureComponent {

    constructor(props) {
        super(props);

        this.onPhotoLoad = this.onPhotoLoad.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchPhotos());
        window.addEventListener('unload', () => {
            beaconStats({photosLoaded: this.getNumberOfLoadedPhotos()});
        });
    }

    getNumberOfLoadedPhotos() {
        return this.props.photos.filter(p => p.loaded).length;
    }

    onPhotoLoad({key}) {
        postStats({photosLoaded: this.getNumberOfLoadedPhotos()});
        this.props.dispatch(photoLoaded(key));
    }

    render() {
        const {pageYOffset, photos, filters} = this.props;
        return (
            <div id="photo-section">
                <PhotoScroller
                    onPhotoLoad={this.onPhotoLoad}
                    photos={photos}
                    pageYOffset={pageYOffset}
                    filters={filters} />
                <TitleBar/>
            </div>
        );
    }
}

function select(state) {
    return {
        photos: state.photos.data,
        pageYOffset: state.scroll.pageYOffset,
        filters: state.filters.data
    };
}


export default connect(select)(PhotoSection);
