import {serverToClient} from '../../../common/photo-data-conversion';
import {description} from '../../../common/constants';

const name = 'The Splendid Nudibranch';

function buildUrl({selectedPhotoKey, year, location}) {
    let url = 'http://www.thesplendidnudibranch.pink';

    if (selectedPhotoKey) {
        url += `/photos/${selectedPhotoKey}`;
    }

    if (location || year) {
        url += '/?';
        url += Object.entries({location, year})
            .filter(e => e[1])
            .map(entry => `${entry[0]}=${entry[1]}`)
            .join('&');
    }

    return url;
}

export default (data, {selectedPhotoKey, year, location}) => {
    const match = data.photoData.photos.filter(p => p.key === selectedPhotoKey)[0];

    let filterTitle;
    if (location || year) {
        filterTitle = [location, year]
            .filter(e => e)
            .map(str => (
                str.charAt(0).toUpperCase() + str.slice(1)
            ))
            .join(' ');
    }

    if (match) {
        const selectedPhoto = serverToClient(match, data.photoData.base);
        const selectedPhotoSize = selectedPhoto.sizes.medium;

        return {
            'og:type': 'article',
            'og:site_name': name,
            'og:title': [filterTitle || selectedPhoto.title, name].filter(e => e).join(' :: '),
            'og:url': buildUrl({selectedPhotoKey, year, location}),
            'og:description': selectedPhoto.description,
            'og:image': selectedPhotoSize.url,
            'og:image:width': selectedPhotoSize.width,
            'og:image:height': selectedPhotoSize.height
        };
    }

    return {
        'og:type': 'article',
        'og:site_name': name,
        'og:title': [filterTitle, name].filter(e => e).join(' :: '),
        'og:url': buildUrl({year, location}),
        'og:description': description,
        'og:image': 'http://www.thesplendidnudibranch.pink/static/images/logo.png',
        'og:image:width': 1300,
        'og:image:height': 616
    };
};
