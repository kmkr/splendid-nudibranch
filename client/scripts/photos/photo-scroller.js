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

const showPhotos = 2;

class PhotoScroller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleStart: 0,
            visibleEnd: Math.min(this.props.photos.length, showPhotos)
        };
    }

    componentWillMount() {
        throttle('scroll', 'optimizedScroll');
        window.addEventListener('optimizedScroll', () => {
            const photoListWrapper = document.getElementById('photo-list-wrapper');
            const {pageYOffset} = window;
            if (pageYOffset > photoListWrapper.offsetHeight) {
                this.setState({
                    visibleStart: 0,
                    visibleEnd: this.state.visibleEnd + 2
                });
            }
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            visibleStart: 0,
            visibleEnd: Math.min(props.photos.length, showPhotos)
        });
    }

    render() {
        return (<ListPhotos
            photos={this.props.photos}
            photoSize="large"
            visibleStart={this.state.visibleStart}
            visibleEnd={this.state.visibleEnd} />
        );
    }
}

PhotoScroller.propTypes = {
    photos: PropTypes.array.isRequired
};

export default PhotoScroller;
