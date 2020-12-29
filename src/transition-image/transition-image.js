import { useState } from "react";

import { setLoaded, isLoaded } from "./loaded-images";

const TransitionImage = ({ alt, onClick, src, srcSet, sizes }) => {
  const [visible, setVisible] = useState(false);

  function onLoad() {
    if (visible) {
      // Some browsers call onLoad multiple times, perhaps due to srcSet
      return;
    }

    setLoaded(src);
    setVisible(true);
  }

  const isVisible = visible || isLoaded(src);

  return (
    <img
      alt={alt || ""}
      className="transition-image"
      onClick={onClick}
      onLoad={onLoad}
      style={{ opacity: visible ? 1 : 0 }}
      srcSet={srcSet}
      sizes={sizes}
    />
  );
};

export default TransitionImage;
