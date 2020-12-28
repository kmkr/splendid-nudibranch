import { PureComponent } from "react";

import Photo from "./photo";
import setPhotoWidth from "./set-width-helper";
import throttle from "./throttle";
import getWidth from "./get-width";
import MidWater from "./mid-water";

function hasScrollbar() {
  return document.body.offsetHeight >= window.innerHeight;
}

class Collage extends PureComponent {
  constructor(props) {
    super();

    this.updateWidth = this.updateWidth.bind(this);
    this.renderPhotoGroup = this.renderPhotoGroup.bind(this);

    this.state = {};

    // this.state = {
    //   width: getWidth(),
    // };
  }

  getIsCollage() {
    if (this.state.width) {
      return getWidth() > 1100;
    }
    return false;
  }

  updateWidth() {
    this.setState({
      width: getWidth(),
    });
  }

  componentDidMount() {
    throttle("resize", "optimizedResize");
    window.addEventListener("optimizedResize", this.updateWidth);

    // Force re-calculation of photo height/width if scrollbar is present
    // if (hasScrollbar()) {
    this.updateWidth();
    // }
  }

  componentWillUnmount() {
    window.removeEventListener("optimizedResize", this.updateWidth);
  }

  renderPhotoGroup(photoGroup) {
    const setDimensions = this.getIsCollage();
    const style = setDimensions ? { height: `${photoGroup.height}px` } : {};
    return (
      <div
        className="photo-group"
        key={`photo-group-${photoGroup.key}`}
        style={style}
      >
        {photoGroup.photos.map((photo) => (
          <Photo key={photo.key} setWidth={setDimensions} photo={photo} />
        ))}
      </div>
    );
  }

  render() {
    const { featuredPhotos, nonFeaturedPhotos } = this.props;

    const featuredPhotoGroups = setPhotoWidth(featuredPhotos);
    const nonFeaturedPhotoGroups = setPhotoWidth(nonFeaturedPhotos);
    return (
      <div id="collage">
        {featuredPhotoGroups.map(this.renderPhotoGroup)}
        {!!featuredPhotoGroups.length && <MidWater />}
        {nonFeaturedPhotoGroups.map(this.renderPhotoGroup)}
      </div>
    );
  }
}

export default Collage;
