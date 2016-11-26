export default (filters = []) => {
    const keys = Object.keys(filters);
    if (!keys.length) {
        return '';
    }

    const f = keys
        .map(key => {
            const singular = key.replace(/s$/, '');
            return `${singular}=${filters[key]}`;
        })
        .join('&');

    return `?${f}`;
};
