//import {convert} from '../../../common/photo-data-conversion';

const OgTags = (data, selectedPhotoKey) => {
    const match = data.photos.filter(p => p.key === selectedPhotoKey)[0];

    if (!match) {
        return {};
    }

    // todo: få denne til å fungere
    //const selectedPhoto = photoDataConversion(match, data.base);
    const selectedPhotoUrl = `${data.base}/${match.key}/m_${match.name}`;

    const tags = {
        'og:type': 'article',
        'og:site_name': 'The Splendid Nudibranch',
        'og:title': match.title,
        'og:url': `http://www.splendid-nudibran.ch/photos/${match.key}`,
        'og:description': match.description,
        'og:image': selectedPhotoUrl
    };

    return tags;
};

export default OgTags;
