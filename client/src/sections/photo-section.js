import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {photoLoaded, fetchPhotos} from '../photos/photo-actions';
import PhotoScroller from '../photos/photo-scroller';
import './photo-section.scss';

class PhotoSection extends PureComponent {

    constructor(props) {
        super(props);

        this.onPhotoLoad = this.onPhotoLoad.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchPhotos());
    }

    onPhotoLoad({key}) {
        this.props.dispatch(photoLoaded(key));
    }

    render() {
        const {pageYOffset, photos} = this.props;
        return (
            <div id="photo-section">
                <PhotoScroller
                    onPhotoLoad={this.onPhotoLoad}
                    photos={photos}
                    pageYOffset={pageYOffset} />
            </div>
        );
    }
}

function select(state) {
    return {
        photos: state.photos.data,
        pageYOffset: state.scroll.pageYOffset
    };
}


export default connect(select)(PhotoSection);
