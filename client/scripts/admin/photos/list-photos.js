import React, {PropTypes} from 'react';

import './list-photos.scss';
import EditPhoto from './edit-photo';

const ListPhotos = ({photos, onDeleteClick, onUpdateClick}) => (
    <div className="list-photos row">
        {photos.map(photo => (
            <div className="col-md-7" key={photo.key}>
                <img src={photo.small} />
                <EditPhoto
                    onDeleteClick={onDeleteClick}
                    onUpdateClick={onUpdateClick}
                    photo={photo} />
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
