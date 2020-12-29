import { PureComponent } from "react";
import Link from "next/link";

import TransitionImage from "../transition-image/transition-image";
import PhotoText from "../photos/photo-text";
// import decorateLink from "../feature/decorate-link";
// todo: fix inkludering av search params på lenker

class Photo extends PureComponent {
  constructor() {
    super();
    this.state = {
      inViewport: false,
    };
  }

  componentDidMount() {
    const options = {
      root: null,
      rootMargin: "300px",
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.setState({
            inViewport: true,
          });
        }
      });
    }, options);
    observer.observe(this.domElem);
  }

  render() {
    const { photo, setWidth } = this.props;
    const { inViewport } = this.state;
    const style = {
      width: setWidth ? `${photo.displayedWidth}px` : "100%",
    };

    return (
      <div
        ref={(domElem) => (this.domElem = domElem)}
        className="photo"
        data-photo-key={photo.key}
        style={style}
      >
        <Link href={`/photos/${photo.key}`}>
          <a>
            <div className="overlay-title-wrapper">
              <p className="title">{photo.title}</p>
              <p className="location">{photo.location}</p>
            </div>
            {inViewport && (
              <TransitionImage
                alt={photo.title}
                src={photo.sizes.xsmall.url}
                srcSet={photo.srcSet}
                sizes="(min-width: 1100px) 30vw, 100vw"
              />
            )}
          </a>
        </Link>

        <div className="sn-dn-ns sn-mb-l">
          <PhotoText photo={photo} />
        </div>
      </div>
    );
  }
}

export default Photo;
