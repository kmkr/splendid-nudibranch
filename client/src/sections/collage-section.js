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

    // todo: sett bredde på photos
    // todo: oppdater bredde på photos på resize event

    // bredde-algoritme:
    // hvis minst tre av de fem neste er portrait => 5
    // hvis to av de fire neste er portrait => 4
    // hvis en eller ingen av de tre neste er portrait => 3

    // høyde settes ved å:
    // totalBredde = Math.min(window.innerWidth, max-bredde)
    // wide bilder får (16/9 av plassen / ant bilder per rad)
    // portrait bilder får (2/3 av plassen / ant bilder per rad)

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
