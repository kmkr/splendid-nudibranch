import { useEffect } from "react";

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

const KeyboardEventHandler = ({
  onHome,
  onPrevious,
  onNext,
  onToggleSidebar,
}) => {
  function handleKeyUp(e) {
    const keyCode = e.keyCode || e.detail.keyCode;

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
  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return function cleanup() {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return null;
};

export default KeyboardEventHandler;
