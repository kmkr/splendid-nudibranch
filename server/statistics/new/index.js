import db from '../../db';

export default (req) => {
    return db.storeStatistic(req.body);
};
