import * as cache from '../cache';
import getPhotosHandler from './list';

export function list() {
    if (cache.get('photos')) {
        console.log('Serving photos from cache');
        return Promise.resolve(cache.get('photos'));
    }

    return getPhotosHandler()
        .then(response => {
            cache.put('photos', response);
            return response;
        });
}
