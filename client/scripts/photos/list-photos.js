import React, {Component, PropTypes} from 'react';
import {resizeTo} from '../../../common/constants';

function photoSizeToColClass(photoSize) {
    switch (photoSize) {
    case 'small':
        return 'col-sm-4';
    case 'medium':
        return 'col-sm-7';
    case 'large':
        return 'col-sm-12';
    default:
        throw new Error(`Unsupported photo size ${photoSize}`);

    }
}

class ListPhotos extends Component {

    isVisible(index) {
        const {photos, visibleStart} = this.props;
        let {visibleEnd} = this.props;
        if (!visibleEnd) {
            visibleEnd = photos.length;
        }
        return index >= visibleStart && index < visibleEnd;
    }

    render() {
        const {photos, photoSize} = this.props;

        const colClass = photoSizeToColClass(photoSize);
        return (
            <div className="row">
                {photos.map((photo, index) => (
                    this.isVisible(index) ? (
                        <div
                            key={photo.key}
                            className={colClass}>
                                <img src={photo[photoSize]} />
                                <p>{photo.description}</p>
                        </div>
                    ) : null
                ))}

                <div id="photo-list-wrapper"></div>
            </div>
        );
    }
}

ListPhotos.propTypes = {
    photos: PropTypes.array.isRequired,
    photoSize: PropTypes.oneOf(resizeTo.map(r => r.name)).isRequired,
    visibleStart: PropTypes.number,
    visibleEnd: PropTypes.number
};

ListPhotos.defaultProps = {
    visibleStart: 0
};

export default ListPhotos;
