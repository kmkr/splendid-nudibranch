//import {convert} from '../../../common/photo-data-conversion';
import {description} from '../../../common/constants';

const OgTags = (data, selectedPhotoKey) => {
    const match = data.photoData.photos.filter(p => p.key === selectedPhotoKey)[0];

    // todo: få denne til å fungere
    //const selectedPhoto = photoDataConversion(match, data.photoData.base);

    if (match) {
        const selectedPhotoUrl = `${data.photoData.base}/${match.key}/m_${match.name}`;
        return {
            'og:type': 'article',
            'og:site_name': 'The Splendid Nudibranch',
            'og:title': match.title,
            'og:url': `http://www.thesplendidnudibranch.pink/photos/${match.key}`,
            'og:description': match.description,
            'og:image': selectedPhotoUrl
        };
    }

    return {
        'og:site_name': 'The Splendid Nudibranch',
        'og:url': 'http://www.thesplendidnudibranch.pink',
        'og:description': description,
        'og:image': '' // todo: eksporter en PNG av logo med svart bakgrunn
    };
};

export default OgTags;
