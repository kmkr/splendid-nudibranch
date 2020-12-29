import PhotoText from "./photo-text";

const Sidebar = ({ expanded, photo, onToggleExpanded }) => (
  <div id="sidebar-wrapper" className={photo.mode}>
    <div id="sidebar">
      <div className={expanded ? "expanded" : ""}>
        <a
          href="#"
          title={expanded ? "Close info box" : "Read more about this photo"}
          tabIndex="0"
          onClick={onToggleExpanded}
        >
          <span className="one" />
          <span className="two" />
        </a>
      </div>
    </div>

    <div id="sidebar-text" className={expanded ? "expanded" : ""}>
      <PhotoText photo={photo} />
    </div>
  </div>
);

export default Sidebar;
