import db from '../../db';

export default (req) => {
    const origin = req.ip;
    const ua = req.get('User-Agent');
    return db.storeStatistic({
        origin,
        ua,
        ...req.body
    });
};
