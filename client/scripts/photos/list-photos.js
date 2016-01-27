import React, {PropTypes} from 'react';

const ListPhotos = ({photos}) => (
    <div>
        {photos.map(photo => (
            <img src={photo.small} />
        ))}
    </div>
);

ListPhotos.propTypes = {
    photos: PropTypes.array.isRequired
};

export default ListPhotos;
