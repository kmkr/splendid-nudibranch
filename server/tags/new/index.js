import db from '../../db';

export default (photoKey, tags) => {
    return Promise.all(tags.map(tagName => {
        console.log(`Handling tag ${tagName}`);
        return db.getTags({name: tagName})
            .then(storedTags => storedTags[0])
            .then(storedTag => {
                if (storedTag) {
                    console.log(`Already stored tag ${tagName}. Adding ${photoKey} to ${JSON.stringify(storedTag.photos)}`);
                    return db.updateTag(tagName, {
                        photos: [...storedTag.photos, photoKey]
                    }).then(() => ({
                        name: tagName,
                        photoKey
                    }));
                } else {
                    const tag = {
                        name: tagName,
                        photos: [photoKey]
                    };
                    return db.insertTag(tag).then(() => ({
                        name: tagName,
                        photoKey
                    }));
                }
            });
    }));
};
