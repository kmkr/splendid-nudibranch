import { PureComponent } from "react";

const LEFT_KEYS = [
  33, // pgup
  37, // arrow left
];
const RIGHT_KEYS = [
  32, // space
  34, // pgdn
  39, // arrow right
];
const SIDEBAR_KEYS = [
  73, // i
];
const HOME_KEYS = [
  27, // ESC
];

class KeyboardEventHandler extends PureComponent {
  constructor() {
    super();
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  handleKeyUp(e) {
    const keyCode = e.keyCode || e.detail.keyCode;
    const { onHome, onPrevious, onNext, onToggleSidebar } = this.props;

    if (e.altKey) {
      return;
    }

    if (LEFT_KEYS.indexOf(keyCode) !== -1) {
      e.preventDefault();
      onPrevious();
    } else if (RIGHT_KEYS.indexOf(keyCode) !== -1) {
      e.preventDefault();
      onNext();
    } else if (SIDEBAR_KEYS.indexOf(keyCode) !== -1) {
      e.preventDefault();
      onToggleSidebar();
    } else if (HOME_KEYS.indexOf(keyCode) !== -1) {
      e.preventDefault();
      onHome();
    }
  }

  render() {
    return null;
  }
}

export default KeyboardEventHandler;
