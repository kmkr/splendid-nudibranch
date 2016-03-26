const collages = [
    {
        type: '2x2',
        items: [
            {
                key: '8dd8-2b52',
                url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/8dd8-2b52/s_DSC00974-vurder-i-bredere-format.jpg'
            },
            {
                key: 'adc8-9656',
                url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/adc8-9656/s_DSC04061.jpg'
            },
            {
                key: '610a-791f',
                url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/610a-791f/s_DSC03769.jpg'
            },
            {
                key: 'deb9-6193',
                url: 'https://s3.eu-central-1.amazonaws.com/splendid-nudibranch-dev/deb9-6193/s_DSC07567.jpg'
            }
        ]
    }
];

export function getCollage() {
    return collages[Math.floor(Math.random() * collages.length)];
}
