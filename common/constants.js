export const resizeTo = [
    {
        name: 'thumb',
        shortName: 'thumb',
        width: 220
    },
    {
        name: 'xsmall',
        shortName: 'xs',
        width: 500
    },
    {
        name: 'small',
        shortName: 's',
        width: 1000
    },
    {
        name: 'medium',
        shortName: 'm',
        width: 1400
    },
    {
        name: 'large',
        shortName: 'l',
        width: 1900
    }
];

export const getPhotoSizeForWidth = width => {
    return resizeTo.filter(rt => rt.width > width)[0] || resizeTo[resizeTo.length - 1];
};
