import React, {Component, PropTypes} from 'react';

import ListPhotos from './list-photos';

const throttle = (type, name, obj) => {
    obj = obj || window;
    let running = false;
    const func = () => {
        if (running) {
            return;
        }
        running = true;
        requestAnimationFrame(() => {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
        });
    };
    obj.addEventListener(type, func);
};

const SHOW_PHOTOS = 2;
const WIDTH_MAP = {
    SIZE_1: {
        name: 'small',
        weight: 1
    },
    SIZE_2: {
        name: 'medium',
        weight: 2
    },
    SIZE_3: {
        name: 'large',
        weight: 3
    }
};

class PhotoScroller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoSize: this.getPhotoSize(),
            visibleStart: 0,
            visibleEnd: Math.min(this.props.photos.length, SHOW_PHOTOS)
        };
    }

    componentWillMount() {
        throttle('scroll', 'optimizedScroll');
        throttle('resize', 'optimizedResize');
        window.addEventListener('optimizedScroll', this.updateVisiblePhotos);
        window.addEventListener('optimizedResize', () => {
            if (this.getPhotoSize().weight > this.state.photoSize.weight) {
                this.setState({
                    photoSize: this.getPhotoSize()
                });
            }
            this.updateVisiblePhotos();
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            visibleStart: 0,
            visibleEnd: Math.min(props.photos.length, SHOW_PHOTOS)
        });
    }

    getPhotoSize() {
        const {innerWidth} = window;

        if (innerWidth > 1024) {
            return WIDTH_MAP.SIZE_3;
        }

        if (innerWidth > 768) {
            return WIDTH_MAP.SIZE_2;
        }

        return WIDTH_MAP.SIZE_1;
    }

    updateVisiblePhotos() {
        const photoListWrapper = document.getElementById('photo-list-wrapper');
        const {pageYOffset} = window;
        const threshold = 200;
        if ((pageYOffset + threshold) > photoListWrapper.offsetHeight) {
            this.setState({
                visibleStart: 0,
                visibleEnd: this.state.visibleEnd + 1
            });
        }
    }

    render() {
        return (<ListPhotos
            photos={this.props.photos}
            photoSize={this.state.photoSize.name}
            visibleStart={this.state.visibleStart}
            visibleEnd={this.state.visibleEnd} />
        );
    }
}

PhotoScroller.propTypes = {
    photos: PropTypes.array.isRequired
};

export default PhotoScroller;
