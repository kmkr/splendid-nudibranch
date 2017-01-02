import React, {PureComponent, PropTypes} from 'react';

import Anchor from '../anchor';
import Photo from './photo';
import filtersToUrlSearchParser from '../filters/filters-to-url-search-parser';

class ListPhotos extends PureComponent {

    constructor(props) {
        super(props);

        this.photoLoaded = this.photoLoaded.bind(this);
    }

    photoLoaded(photo) {
        const {onPhotoLoad} = this.props;
        onPhotoLoad({key: photo.key});
    }

    isVisible(index) {
        const {photos} = this.props;
        let {visibleEnd} = this.props;
        if (!visibleEnd) {
            visibleEnd = photos.length;
        }

        return index < visibleEnd;
    }

    renderPhoto(photo) {
        const {activeFilters} = this.props;
        const name = `photos/${photo.key}${filtersToUrlSearchParser(activeFilters)}`;
        return (
            <div key={photo.key}>
                <Anchor
                    id={`photo-${photo.key}`}
                    name={name} />
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
                {photos.map((photo, index) => (
                    this.isVisible(index) && this.renderPhoto(photo)
                ))}
            </div>
        );
    }
}

ListPhotos.propTypes = {
    activeFilters: PropTypes.array,
    onPhotoLoad: PropTypes.func.isRequired,
    photos: PropTypes.array.isRequired,
    visibleEnd: PropTypes.number
};

ListPhotos.defaultProps = {
    activeFilters: []
};

export default ListPhotos;
