export const base = `${process.env.SN_S3_BASE}/${process.env.SN_S3_BUCKET_NAME}`;
export const resizeTo = [
    {
        name: 'small',
        shortName: 's',
        width: 300
    },
    {
        name: 'medium',
        shortName: 'm',
        width: 800
    },
    {
        name: 'large',
        shortName: 'l',
        width: 1400
    }
];
