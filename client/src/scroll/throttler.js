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
            console.log('wozzy');
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
        });
    }, 200);
    obj.addEventListener(type, func);
};
