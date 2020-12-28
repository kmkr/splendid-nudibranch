/** @jsx h */
import { h, Component } from "./preact";

import Authenticator from "./authenticator";
import PhotoUploader from "./photos/photo-uploader";
import BatchUpdatePhotos from "./photos/batch-update-photos";
import ListPhotos from "./photos/list-photos";
import snFetch from "./fetch";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
    };

    this.onAddPhoto = this.onAddPhoto.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onSetToken = this.onSetToken.bind(this);
    this.onBatchUpdatePhotos = this.onBatchUpdatePhotos.bind(this);
  }

  componentWillMount() {
    snFetch.addHeaderRequestInterceptor(() => ({
      "x-auth": this.state.token,
    }));
  }

  onAddPhoto(photo) {
    snFetch.post("/photos", photo);
  }

  onDeleteClick(photo) {
    snFetch.delete(`/photos/${photo.key}`);
  }

  onSetToken(token) {
    this.setState({ token });
  }

  onBatchUpdatePhotos(photos) {
    if (photos.length) {
      snFetch.postJSON("/photos/metadata", photos);
    } else {
      console.log("Nothing to update");
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-push-2 col-lg-10">
          <Authenticator onSetToken={this.onSetToken} />
          <div style={{ opacity: this.state.token ? 1 : 0.2 }}>
            <h1>Upload photos</h1>
            <PhotoUploader onAddPhoto={this.onAddPhoto} />
            <hr />
            <h1>Batch update photos</h1>
            <BatchUpdatePhotos
              photos={this.props.photos}
              onSubmit={this.onBatchUpdatePhotos}
            />
            <hr />
            <h1>Edit photos</h1>
            <ListPhotos
              photos={this.props.photos}
              onDeleteClick={this.onDeleteClick}
              onSubmitOrder={this.onBatchUpdatePhotos}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
