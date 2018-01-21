/** @jsx h */
import {h, Component} from 'preact'

function toFormData (fileList) {
  return fileList.map(file => {
    const data = new window.FormData()
    data.append('file', file)
    return data
  })
}

class PhotoUploader extends Component {
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

export default PhotoUploader
