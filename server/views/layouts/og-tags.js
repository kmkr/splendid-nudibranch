import {serverToClient} from '../../../common/photo-data-conversion';
import {description} from '../../../common/constants';

const OgTags = (data, selectedPhotoKey) => {
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

    return {
        'og:title': 'The Splendid Nudibranch',
        'og:site_name': 'The Splendid Nudibranch',
        'og:url': 'http://www.thesplendidnudibranch.pink',
        'og:description': description,
        'og:image': 'http://www.thesplendidnudibranch.pink/static/images/logo.png',
        'og:image:width': 1300,
        'og:image:height': 616
    };
};

export default OgTags;
