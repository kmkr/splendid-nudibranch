import { PureComponent } from "react";

import Photo from "./photo";
import Navigation from "./navigation";
import Sidebar from "./sidebar";
// import decorateLink from "../feature/decorate-link";

import KeyboardEventHandler from "./keyboard-event-handler";

class PhotosWrapper extends PureComponent {
  constructor() {
    super();
    // this.onNextPhoto = this.onNextPhoto.bind(this);
    // this.onPreviousPhoto = this.onPreviousPhoto.bind(this);
    this.onToggleExpandSidebar = this.onToggleExpandSidebar.bind(this);
    this.state = {
      sidebarExpanded: true,
    };
  }

  // getCurrentPhotoIndex() {
  //   const { photos, selectedPhoto } = this.props;
  //   return photos.indexOf(selectedPhoto) || 0;
  // }

  // getNextPhoto() {
  //   const { photos } = this.props;
  //   return photos[this.getCurrentPhotoIndex() + 1] || photos[0];
  // }

  // getPreviousPhoto() {
  //   const { photos } = this.props;
  //   return photos[this.getCurrentPhotoIndex() - 1] || photos[photos.length - 1];
  // }

  // onNextPhoto(e) {
  //   e && e.preventDefault();
  //   this.props.onChangePhoto(this.getNextPhoto());
  // }

  // onPreviousPhoto(e) {
  //   e && e.preventDefault();
  //   this.props.onChangePhoto(this.getPreviousPhoto());
  // }

  onToggleExpandSidebar(e) {
    e && e.preventDefault();
    this.setState((prevState) => ({
      sidebarExpanded: !prevState.sidebarExpanded,
    }));
  }

  render() {
    const { onHome, selectedPhoto } = this.props;
    // const nextPhoto = this.getNextPhoto();
    // const previousPhoto = this.getPreviousPhoto();
    return (
      <div>
        <KeyboardEventHandler
          onHome={onHome}
          onNext={this.onNextPhoto}
          onPrevious={this.onPreviousPhoto}
          onToggleSidebar={this.onToggleExpandSidebar}
        />
        <Photo
          photo={selectedPhoto}
          preloadPhotos={[]}
          next={null}
          // <a
          //   href={decorateLink(`/photos/${nextPhoto.key}`)}
          //   className="click-next"
          //   onClick={this.onNextPhoto}
          // />
          // }
          previous={null}
          // <a
          //   href={decorateLink(`/photos/${this.getPreviousPhoto().key}`)}
          //   className="click-previous"
          //   onClick={this.onPreviousPhoto}
          // />
          // }
        />
        <Sidebar
          expanded={this.state.sidebarExpanded}
          onToggleExpanded={this.onToggleExpandSidebar}
          photo={selectedPhoto}
        />
        <Navigation />
      </div>
    );
  }
}

export default PhotosWrapper;
