import React, {PropTypes} from 'react'

function toFormData (fileList) {
  return fileList.map(file => {
    const data = new window.FormData()
    data.append('file', file)
    return data
  })
}

class PhotoUploader extends React.Component {
  onAddPhoto ({target}) {
    const formDataList = toFormData(Array.from(target.files || []))
    formDataList.map(formData => this.props.onAddPhoto(formData))
  }

  render () {
    return (
      <input
        type='file'
        multiple
        onChange={e => this.onAddPhoto(e)} />
    )
  }
}

PhotoUploader.propTypes = {
  onAddPhoto: PropTypes.func.isRequired
}

export default PhotoUploader
