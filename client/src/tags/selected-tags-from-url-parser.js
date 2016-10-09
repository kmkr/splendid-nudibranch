export default () => {
    const uri = location.search.split('?')[1];

    if (uri) {
        return uri.split('&')
            .reduce((prev, cur) => {
                const [key, val] = cur.split('=');
                if (prev[key]) {
                    prev[key].push(val);
                } else {
                    prev[key] = [val];
                }
                return prev;
            }, {}).tag || [];
    }

    return [];
};
