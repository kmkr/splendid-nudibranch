import React, {PureComponent, PropTypes} from 'react';

import TransitionImage from '../transition-image';

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

class Photo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false
        };
        this.onLoad = this.onLoad.bind(this);
    }

    onLoad() {
        const {onPhotoLoad, photo} = this.props;
        this.setState({showComponent: true});
        onPhotoLoad(photo);
    }

    render() {
        const {photo} = this.props;
        const srcSet = buildSrcSet(photo.sizes);

        return (
            <div>
                <div className="photo-and-text-wrapper">
                    <div className={`photo-wrapper ${!this.state.showComponent ? 'loading' : ''} ${photo.mode}`}>
                        <div className="photo">
                            <TransitionImage
                                onLoad={this.onLoad}
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
        loaded: PropTypes.bool
    }),
    onPhotoLoad: PropTypes.func.isRequired
};

export default Photo;
