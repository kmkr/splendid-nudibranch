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

export default (photos, {selectedPhotoKey, year, location}) => {
    const selectedPhoto = photos.filter(p => p.key === selectedPhotoKey)[0];

    let filterTitle;
    if (location || year) {
        filterTitle = [location, year]
            .filter(e => e)
            .map(str => (
                str.charAt(0).toUpperCase() + str.slice(1)
            ))
            .join(' ');
    }

    if (selectedPhoto) {
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
