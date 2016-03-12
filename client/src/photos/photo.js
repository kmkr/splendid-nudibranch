import React, {Component, PropTypes} from 'react';
import {resizeTo} from '../../../common/constants';

import './photo.scss';

const SOME_SPACE_FOR_TITLE_AND_DESCRIPTION = 100;

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
        const {innerHeight, photoSize, photo} = this.props;
        const style = {
            opacity: this.state.loaded ? 1 : 0,
            maxHeight: innerHeight - SOME_SPACE_FOR_TITLE_AND_DESCRIPTION
        };
        return (
            <div className="photo col-xs-14 col-md-12 col-md-offset-1">
                <img
                    style={style}
                    onLoad={this.loaded.bind(this)}
                    src={photo[photoSize]} />
                <p className="title">{photo.title}</p>
                <hr />
                <p className="description">{photo.description}</p>
            </div>
        );
    }
}

Photo.propTypes = {
    photo: PropTypes.object.isRequired,
    innerHeight: PropTypes.number.isRequired,
    photoSize: PropTypes.oneOf(resizeTo.map(r => r.name)).isRequired
};

export default Photo;
