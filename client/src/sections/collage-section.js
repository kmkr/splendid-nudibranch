import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {photoLoaded, fetchPhotos} from '../photos/photo-actions';
import TransitionImage from '../transition-image';
import './collage-section.scss';

class CollageSection extends PureComponent {

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
        const {photos} = this.props;
        return (
            <div id="collage-section">
                {photos.map(photo => (
                    <div className="collage-item">
                        <TransitionImage
                           alt={photo.title}
                           onLoad={this.onLoad}
                           src={photo.sizes.xsmall.url}/>
                    </div>
                ))}
            </div>
        );
    }
}

function select(state) {
    return {
        photos: state.photos.data
    };
}


export default connect(select)(CollageSection);
