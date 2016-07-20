import debounce from 'throttle-debounce/debounce';

export default (type, name, obj) => {
    obj = obj || window;
    let running = false;
    const func = debounce(150, () => {
        if (running) {
            return;
        }
        running = true;
        requestAnimationFrame(() => {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
        });
    });
    obj.addEventListener(type, func);
};
