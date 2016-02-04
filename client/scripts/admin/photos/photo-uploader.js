import React, {PropTypes} from 'react';
import arrayFrom from 'array.from';

function toFormData(fileList) {
    return fileList.map(file => {
        const data = new FormData();
        data.append('file', file);
        return data;
    });
}

class PhotoUploader extends React.Component {

    onAddPhoto({target}) {
        const formDataList = toFormData(arrayFrom(target.files || []));
        formDataList.map(formData => this.props.onAddPhoto(formData));
    }

    render() {
        return (
            <input
                type="file"
                multiple
                onChange={e => this.onAddPhoto(e)} />
        );
    }
}

PhotoUploader.propTypes = {
    onAddPhoto: PropTypes.func.isRequired
};

export default PhotoUploader;
