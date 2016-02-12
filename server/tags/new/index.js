import db from '../../db';

export default tag => {
    return db.insertTag(tag).then(() => tag);
};
