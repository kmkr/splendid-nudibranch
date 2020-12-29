import { PureComponent } from "react";

import { setLoaded, isLoaded } from "./loaded-images";

class TransitionImage extends PureComponent {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad() {
    if (this.state.visible) {
      // Some browsers call onLoad multiple times, perhaps due to srcSet
      return;
    }

    setLoaded(this.props.src);

    this.setState({
      visible: true,
    });
  }

  render() {
    const { alt, onClick, src, srcSet, sizes } = this.props;
    const visible = this.state.visible || isLoaded(src);
    return (
      <img
        alt={alt || ""}
        className="transition-image"
        onClick={onClick}
        onLoad={this.onLoad}
        style={{ opacity: visible ? 1 : 0 }}
        srcSet={srcSet}
        sizes={sizes}
      />
    );
  }
}

export default TransitionImage;
