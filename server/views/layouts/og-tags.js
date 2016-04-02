//import {convert} from '../../../common/photo-data-conversion';
import {description} from '../../../common/constants';

const OgTags = (data, selectedPhotoKey) => {
    const match = data.photos.filter(p => p.key === selectedPhotoKey)[0];

    // todo: få denne til å fungere
    //const selectedPhoto = photoDataConversion(match, data.base);

    if (match) {
        const selectedPhotoUrl = `${data.base}/${match.key}/m_${match.name}`;
        return {
            'og:type': 'article',
            'og:site_name': 'The Splendid Nudibranch',
            'og:title': match.title,
            'og:url': `https://splendid-nudibranch.herokuapp.com/photos/${match.key}`,
            'og:description': match.description,
            'og:image': selectedPhotoUrl
        };
    }

    return {
        'og:site_name': 'The Splendid Nudibranch',
        'og:url': 'https://splendid-nudibranch.herokuapp.com',
        'og:description': description,
        'og:image': '' // todo: eksporter en PNG av logo med svart bakgrunn
    };
};

export default OgTags;
