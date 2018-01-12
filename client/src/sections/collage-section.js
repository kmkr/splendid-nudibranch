import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {photoLoaded, fetchPhotos} from '../photos/photo-actions';
import TransitionImage from '../transition-image';
import './collage-section.scss';

function getNumPortrait(photos) {
    return photos.filter(photo => photo.mode === 'portrait').length;
}

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

    setPhotoWidth() {

        const photos = [...this.props.photos];
        const totalWidth = Math.min(window.innerWidth, 2560);
        const withWidth = [];

        while (photos.length) {
            let numPerRow;
            let numPortrait;
            if (getNumPortrait(photos.slice(0, 5)) >= 3) {
                numPerRow = 5;
                numPortrait = getNumPortrait(photos.slice(0, 5));
            } else if (getNumPortrait(photos.slice(0, 4)) >= 2) {
                numPerRow = 4;
                numPortrait = getNumPortrait(photos.slice(0, 4));
            } else {
                numPortrait = getNumPortrait(photos.slice(0, 3));
                numPerRow = 3;
            }

            console.log(numPerRow);
            for (let i = 0; i < numPerRow; i++) {
                const photoToAdd = photos.shift();
                if (!photoToAdd) {
                    return withWidth;
                }
                const ratioForPhoto = photoToAdd.mode === 'portrait' ? (1.2 * (numPortrait / numPerRow)) : (numPortrait * 3) / numPerRow;
                photoToAdd.displayedWidth = (totalWidth / numPerRow) * ratioForPhoto;
                withWidth.push(photoToAdd);
            }
        }

        return withWidth;
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
        const photos = this.setPhotoWidth();
        return (
            <div id="collage-section">
                {photos.map(photo => (
                    <div className="collage-item">
                        <TransitionImage
                           alt={photo.title}
                           onLoad={this.onLoad}
                           width={photo.displayedWidth}
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
