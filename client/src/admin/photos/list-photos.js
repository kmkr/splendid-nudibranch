import React, {PropTypes} from 'react';

import './list-photos.scss';
import EditPhoto from './edit-photo';

const ListPhotos = ({photos, onDeleteClick, onUpdateClick}) => (
    <div className="list-photos">
        {photos.map(photo => (
            <div className="entry">
                <div key={photo.key} className="thumb">
                    <img src={photo.thumb} />
                </div>
                <div className="form">
                    <EditPhoto
                        onDeleteClick={onDeleteClick}
                        onUpdateClick={onUpdateClick}
                        photo={photo} />
                </div>
            </div>
        ))}
    </div>
);

ListPhotos.propTypes = {
    photos: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onUpdateClick: PropTypes.func.isRequired
};

export default ListPhotos;
