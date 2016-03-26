import React, {Component, PropTypes} from 'react';
import {resizeTo} from '../../../common/constants';

import './photo.scss';

const GIVE_ME_SOME_SLACK = 0;

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
            maxHeight: innerHeight - GIVE_ME_SOME_SLACK
        };
        return (
            <div className="photo-wrapper">
                <div className="photo">
                    <img
                        style={style}
                        onLoad={this.loaded.bind(this)}
                        src={photo[photoSize]} />
                </div>
                <div className={`text  ${photo.layout}`}>
                    <div className="text-wrapper">
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
    photo: PropTypes.object.isRequired,
    innerHeight: PropTypes.number.isRequired,
    photoSize: PropTypes.oneOf(resizeTo.map(r => r.name)).isRequired
};

export default Photo;
