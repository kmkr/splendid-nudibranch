import React, {Component, PropTypes} from 'react';

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
        const {photos} = this.props;

        return (
            <div className="row">
                {photos.map((photo, index) => (
                    this.isVisible(index) ? (
                        <div
                            key={photo.key}
                            className="col-md-12">
                                <img src={photo.medium} />
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
    visibleStart: PropTypes.number,
    visibleEnd: PropTypes.number
};

ListPhotos.defaultProps = {
    visibleStart: 0
};

export default ListPhotos;
