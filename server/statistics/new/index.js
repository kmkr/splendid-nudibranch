import db from '../../db';

export default (req) => {
    const origin = req.ip;
    const ua = req.get('User-Agent');
    const id = req.body.id;
    return db.updateWithInsertFallback('statistics', {id}, {
        origin,
        ua,
        ...req.body
    });
};
