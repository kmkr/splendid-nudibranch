import React, {PureComponent, PropTypes} from 'react';

import Photo from './photo';

class ListPhotos extends PureComponent {

    constructor(props) {
        super(props);

        this.photoLoaded = this.photoLoaded.bind(this);
        this.renderPhoto = this.renderPhoto.bind(this);
    }

    photoLoaded(photo) {
        const {onPhotoLoad} = this.props;
        onPhotoLoad({key: photo.key});
    }

    renderPhoto(photo) {
        return (
            <div key={photo.key}>
                <Photo
                    onPhotoLoad={this.photoLoaded}
                    photo={photo} />
            </div>
        );
    }

    render() {
        const {photos} = this.props;

        return (
            <div>
                {photos.map(this.renderPhoto)}
            </div>
        );
    }
}

ListPhotos.propTypes = {
    onPhotoLoad: PropTypes.func.isRequired,
    photos: PropTypes.array.isRequired
};

export default ListPhotos;
