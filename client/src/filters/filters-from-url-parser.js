export default () => {
    const uri = location.search.split('?')[1];

    if (uri) {
        return uri.split('&')
            .reduce((prev, cur) => {
                const [key, val] = cur.split('=');
                const plural = `${key}s`;
                if (prev[plural]) {
                    prev[plural].push(val);
                } else {
                    prev[plural] = [val];
                }
                return prev;
            }, {});
    }

    return {};
};
