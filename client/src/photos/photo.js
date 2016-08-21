import React, {Component, PropTypes} from 'react';
import shallowCompare from 'shallow-compare-without-functions';

import TransitionImage from '../transition-image';
import Anchor from '../anchor';

import './photo.scss';

function buildSrcSet(sizes) {
    return Object.keys(sizes)
        .reverse()
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
        const {onPhotoLoad, photo} = this.props;
        const srcSet = buildSrcSet(photo.sizes);

        return (
            <div>
                <Anchor id={`photo-${photo.key}`} name={`photos/${photo.key}`} />

                <div className="photo-and-text-wrapper">
                    <div className={`photo-wrapper ${!this.state.showComponent ? 'loading' : ''} ${photo.mode}`}>
                        <div className="photo">
                            <TransitionImage
                                onLoad={() => {
                                    this.setState({showComponent: true});
                                    onPhotoLoad(photo);
                                }}
                                src={photo.sizes.large.url}
                                srcSet={srcSet}
                                sizes="(min-width: 1360px) 60vw"/>
                        </div>
                        <div className="text">
                            <div className="text-wrapper" style={{opacity: this.state.showComponent ? 1 : 0}}>
                                <p className="title">{photo.title}</p>
                                <p className="latin">{photo.latin}</p>
                                <p className="description">{photo.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Photo.propTypes = {
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
