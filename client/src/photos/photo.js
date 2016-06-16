import React, {Component, PropTypes} from 'react';
import shallowCompare from 'shallow-compare-without-functions';

import TransitionImage from '../transition-image';
import Anchor from '../anchor';

import './photo.scss';

const GIVE_ME_SOME_SLACK_FACTOR = 0.85;

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

    shouldComponentUpdate(nextProps, nextStyle) {
        return shallowCompare(this, nextProps, nextStyle);
    }

    render() {
        const {availHeight, onPhotoLoad, photo} = this.props;
        const srcSet = buildSrcSet(photo.sizes);

        return (
            <div className={`photo-wrapper ${!this.state.showComponent ? 'loading' : ''} ${photo.mode}`}>
                <Anchor id={`photo-${photo.key}`} name={`photos/${photo.key}`} />
                <div className="photo">
                    <TransitionImage
                        onLoad={() => {
                            this.setState({showComponent: true});
                            onPhotoLoad(photo);
                        }}
                        style={{maxHeight: `${availHeight * GIVE_ME_SOME_SLACK_FACTOR}px`}}
                        src={photo.sizes.large.url}
                        srcSet={srcSet}
                        sizes="(max-width: 1360px) l00vw, (min-width: 1360px) 70vw"/>
                </div>
                <div className="text">
                    <div className="text-wrapper" style={{opacity: this.state.showComponent ? 1 : 0}}>
                        <p className="title">{photo.title}</p>
                        <p className="latin">{photo.latin}</p>
                        <p className="description">{photo.description}</p>
                    </div>
                </div>
                <div style={{clear: 'both'}}/>
            </div>
        );
    }
}

Photo.propTypes = {
    availHeight: PropTypes.number.isRequired,
    photo: PropTypes.shape({
        description: PropTypes.string,
        mode: PropTypes.oneOf(['portrait', 'landscape']).isRequired,
        latin: PropTypes.string,
        sizes: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        loaded: PropTypes.bool.isRequired
    }),
    onPhotoLoad: PropTypes.func.isRequired
};

export default Photo;
