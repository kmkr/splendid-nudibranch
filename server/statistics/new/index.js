import db from '../../db';

export default (req) => {
    const ip = req.get('X-Forwarded-For');
    return db.storeStatistic({
        origin: ip,
        ...req.body
    });
};
