import React, {Component, PropTypes} from 'react';
import TransitionImage from '../transition-image';
import Anchor from '../anchor';

import './photo.scss';

const GIVE_ME_SOME_SLACK = 0;

function buildSrcSet(sizes) {
    return Object.keys(sizes)
        .map(key => {
            const size = sizes[key];
            return `${size.url} ${size.width}w`;
        })
        .join(', ');
}

class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false
        };
    }

    render() {
        const {availHeight, onPhotoLoad, photo} = this.props;
        const srcSet = buildSrcSet(photo.sizes);

        return (
            <div className={`photo-wrapper ${!this.state.showComponent ? 'loading' : ''}`}>
                <Anchor id={`photo-${photo.key}`} name={`photos/${photo.key}`} />
                <div className="photo">
                    <TransitionImage
                        onLoad={() => {
                            this.setState({showComponent: true});
                            onPhotoLoad(photo);
                        }}
                        style={{maxHeight: availHeight - GIVE_ME_SOME_SLACK}}
                        srcSet={srcSet}
                        sizes="(max-width: 1360px) l00vw, (min-width: 1360px) 80vw"
                        src={photo.sizes.large.url}/>
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
    availHeight: PropTypes.number.isRequired,
    photo: PropTypes.object.isRequired,
    onPhotoLoad: PropTypes.func.isRequired
};

export default Photo;
