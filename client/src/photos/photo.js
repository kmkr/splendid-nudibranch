import React, {Component, PropTypes} from 'react';
import {resizeTo} from '../../../common/constants';
import TransitionImage from '../transition-image';
import Anchor from '../anchor';

import './photo.scss';

const GIVE_ME_SOME_SLACK = 0;

class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false
        };
    }

    render() {
        const {innerHeight, onPhotoLoad, photo, photoSize} = this.props;

        return (
            <div className={`photo-wrapper ${!this.state.showComponent ? 'loading' : ''}`}>
                <Anchor id={`photo-${photo.key}`} name={`photos/${photo.key}`} />
                <div className="photo">
                    <TransitionImage
                        onLoad={() => {
                            this.setState({showComponent: true});
                            onPhotoLoad(photo);
                        }}
                        style={{maxHeight: innerHeight - GIVE_ME_SOME_SLACK}}
                        src={photo[photoSize]} />
                </div>
                <div className={`text ${photo.layout}`}>
                    <div className="text-wrapper" style={{opacity: this.state.showComponent ? 1 : 0}}>
                        <p className="title">{photo.title}</p>
                        <p className="latin">{photo.latin}</p>
                        <p className="description">{photo.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

Photo.propTypes = {
    innerHeight: PropTypes.number.isRequired,
    photo: PropTypes.object.isRequired,
    photoSize: PropTypes.oneOf(resizeTo.map(r => r.name)).isRequired,
    onPhotoLoad: PropTypes.func.isRequired
};

export default Photo;
