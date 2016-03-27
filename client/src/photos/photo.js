import React, {PropTypes} from 'react';
import {resizeTo} from '../../../common/constants';
import TransitionImage from '../transition-image';

import './photo.scss';

const GIVE_ME_SOME_SLACK = 0;

const Photo = ({photo, photoSize}) => {
    const style = {
        maxHeight: innerHeight - GIVE_ME_SOME_SLACK
    };
    return (
        <div className="photo-wrapper">
            <div className="photo">
                <TransitionImage
                    style={style}
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
};

Photo.propTypes = {
    photo: PropTypes.object.isRequired,
    photoSize: PropTypes.oneOf(resizeTo.map(r => r.name)).isRequired
};

export default Photo;
