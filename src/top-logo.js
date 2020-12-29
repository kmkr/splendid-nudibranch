import Link from "next";

const TopLogo = ({ onGoToPhotos }) => (
  <div id="top-logo" onClick={onGoToPhotos}>
    <img src="/images/logo.svg" />
    <a href="#collage" className="arrow" />
  </div>
);

export default TopLogo;
