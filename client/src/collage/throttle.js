import throttleit from 'throttleit';

export default (type, name, obj) => {
    obj = obj || window;
    let running = false;
    const func = throttleit(() => {
        if (running) {
            return;
        }
        running = true;
        requestAnimationFrame(() => {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
        });
    }, 200);
    obj.addEventListener(type, func);
};