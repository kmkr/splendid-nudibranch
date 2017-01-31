import {serverToClient} from '../../../common/photo-data-conversion';
import {description} from '../../../common/constants';

const name = 'The Splendid Nudibranch';

export default (data, {selectedPhotoKey, year, location}) => {
    const match = data.photoData.photos.filter(p => p.key === selectedPhotoKey)[0];

    if (match) {
        const selectedPhoto = serverToClient(match, data.photoData.base);
        const selectedPhotoSize = selectedPhoto.sizes.medium;

        return {
            'og:type': 'article',
            'og:site_name': name,
            'og:title': `${selectedPhoto.title} :: ${name}`,
            'og:url': `http://www.thesplendidnudibranch.pink/photos/${selectedPhoto.key}`,
            'og:description': selectedPhoto.description,
            'og:image': selectedPhotoSize.url,
            'og:image:width': selectedPhotoSize.width,
            'og:image:height': selectedPhotoSize.height
        };
    }

    let url = 'http://www.thesplendidnudibranch.pink';
    let title;
    if (location || year) {
        url += '/?';
        title = ['Photos from', location, year]
            .filter(e => e)
            .join(' ') + ` :: ${name}`;
    }

    url += Object.entries({location, year}).filter(e => e[1]).map(entry => `${entry[0]}=${entry[1]}`).join('&');

    return {
        'og:title': title || name,
        'og:site_name': name,
        'og:url': url,
        'og:description': description,
        'og:image': 'http://www.thesplendidnudibranch.pink/static/images/logo.png',
        'og:image:width': 1300,
        'og:image:height': 616
    };
};
