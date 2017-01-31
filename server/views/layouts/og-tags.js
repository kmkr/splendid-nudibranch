import {serverToClient} from '../../../common/photo-data-conversion';
import {description} from '../../../common/constants';

export default (data, {selectedPhotoKey, year, location}) => {
    const match = data.photoData.photos.filter(p => p.key === selectedPhotoKey)[0];

    if (match) {
        const selectedPhoto = serverToClient(match, data.photoData.base);
        const selectedPhotoSize = selectedPhoto.sizes.medium;

        return {
            'og:type': 'article',
            'og:site_name': 'The Splendid Nudibranch',
            'og:title': selectedPhoto.title,
            'og:url': `http://www.thesplendidnudibranch.pink/photos/${selectedPhoto.key}`,
            'og:description': selectedPhoto.description,
            'og:image': selectedPhotoSize.url,
            'og:image:width': selectedPhotoSize.width,
            'og:image:height': selectedPhotoSize.height
        };
    }

    let url = 'http://www.thesplendidnudibranch.pink';
    if (location || year) {
        url += '/?';
    }

    url += Object.entries({location, year}).filter(e => e[1]).map(entry => `${entry[0]}=${entry[1]}`).join('&');

    return {
        'og:title': 'The Splendid Nudibranch',
        'og:site_name': 'The Splendid Nudibranch',
        'og:url': url,
        'og:description': year || location ? ['Photos from', location, year].filter(e => e).join(' ') : description,
        'og:image': 'http://www.thesplendidnudibranch.pink/static/images/logo.png',
        'og:image:width': 1300,
        'og:image:height': 616
    };
};
