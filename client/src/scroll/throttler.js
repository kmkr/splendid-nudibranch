import debounce from 'debounce';

export default (type, name, obj) => {
    obj = obj || window;
    let running = false;
    const func = debounce(() => {
        if (running) {
            return;
        }
        running = true;
        requestAnimationFrame(() => {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
        });
    }, 150);
    obj.addEventListener(type, func);
};
