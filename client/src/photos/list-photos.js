/** @jsx h */
import {h, Component} from 'preact';

import Photo from './photo';

class ListPhotos extends Component {

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

export default ListPhotos;
