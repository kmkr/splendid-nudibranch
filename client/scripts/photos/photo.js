import React, {Component, PropTypes} from 'react';
import {resizeTo} from '../../../common/constants';

function photoSizeToColClass(photoSize) {
    switch (photoSize) {
    case 'small':
        return 'col-sm-4';
    case 'medium':
        return 'col-sm-7';
    case 'large':
        return 'col-sm-14';
    default:
        throw new Error(`Unsupported photo size ${photoSize}`);
    }
}

class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }
    loaded() {
        this.setState({
            loaded: true
        });
    }
    render() {
        const {photoSize, photo} = this.props;
        return (
            <div className={photoSizeToColClass(photoSize)}>
                <img
                    style={{opacity: this.state.loaded ? 1 : 0}}
                    onLoad={this.loaded.bind(this)}
                    src={photo[photoSize]} />
                <p>{photo.title}</p>
                <p>{photo.description}</p>
            </div>
        );
    }
}

Photo.propTypes = {
    photo: PropTypes.object.isRequired,
    photoSize: PropTypes.oneOf(resizeTo.map(r => r.name)).isRequired
};

export default Photo;
