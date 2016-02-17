import React, {Component, PropTypes} from 'react';
import {resizeTo} from '../../../common/constants';

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
            <div className="col-xs-14 col-xl-12 col-xl-offset-1">
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
