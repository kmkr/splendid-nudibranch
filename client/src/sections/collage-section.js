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
        const groups = [];

        while (photos.length) {
            const subGroup = {
                height: null,
                photos: []
            };
            let numThisRow = 3;
            let portraitScaleFactor = 1;
            let landscapeScaleFactor = 1;
            const numNext5 = getNumPortrait(photos.slice(0, 5));

            if (numNext5 && numNext5 < 5) {
                const numNext4 = getNumPortrait(photos.slice(0, 4));
                const numNext3 = getNumPortrait(photos.slice(0, 3));

                if (numNext5 === 4) {
                    // ??
                    numThisRow = 5;
                } else if (numNext5 === 3) {
                    numThisRow = 5;
                    portraitScaleFactor = 0.6;
                    landscapeScaleFactor = 1.3;
                } else if (numNext4 === 2) {
                    numThisRow = 4;
                    portraitScaleFactor = 0.6;
                    landscapeScaleFactor = 1.35;
                } else if (numNext3 === 1) {
                    portraitScaleFactor = 0.5;
                    landscapeScaleFactor = 1.2;
                }
            }

            console.log(`numThisRow ${numThisRow} psf ${portraitScaleFactor} lsf ${landscapeScaleFactor}`);
            for (let i = 0; i < numThisRow; i++) {
                const photoToAdd = photos.shift();
                if (!photoToAdd) {
                    return groups;
                }
                const scale = photoToAdd.mode === 'portrait' ? portraitScaleFactor : landscapeScaleFactor;

                const marginsInRow = (numThisRow + 1) * 8;
                photoToAdd.displayedWidth = ((totalWidth - marginsInRow) / numThisRow) * scale;
                subGroup.photos.push(photoToAdd);
                const height = photoToAdd.mode === 'portrait' ? photoToAdd.displayedWidth * (4 / 3) : photoToAdd.displayedWidth * (9 / 16);
                subGroup.height = subGroup.height ? Math.min(subGroup.height, height) : height;
                // next row
            }
            groups.push(subGroup);
        }

        return groups;
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
        const photoGroups = this.setPhotoWidth();
        return (
            <div id="collage-section">
                {photoGroups.map((photoGroup, index) => (
                    <div key={`photo-group-${index}`} style={{maxHeight: `${photoGroup.height}px`}}>
                        {photoGroup.photos.map(photo => (
                            <div key={photo.key}
                                className="collage-item"
                                style={{width: `${photo.displayedWidth}px`}}>
                                <TransitionImage
                                    alt={photo.title}
                                    onLoad={this.onLoad}
                                    src={photo.sizes.xsmall.url}/>
                            </div>
                        ))}
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
