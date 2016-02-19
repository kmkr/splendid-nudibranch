import idGenerator from './id-generator';
import s3Uploader from '../s3/s3-uploader';
import resizer from './resizer';
import tempFileWriter from './temp-file-writer';
import db from '../../db';
import {base} from '../constants';
import {resizeTo} from '../../../common/constants';
import * as photoDataFormatter from '../photo-data-formatter';

function resizeToMultiple(path) {
    return resizeTo.map(r => (
        resizer(path, r.width)
    ));
}

function upload(id, file, resizedResults) {
    const mimetype = file.mimetype;

    function upl(prefix, buffer) {
        const name = `${id}/${prefix}_${file.originalname}`;
        return s3Uploader.upload(buffer, name, mimetype);
    }

    return [
        upl('o', file.buffer),
        ...resizeTo.map((r, index) => (
            upl(r.shortName, resizedResults[index].buffer)
        ))
    ];
}

function insertToDb(id, file) {
    const photo = {
        base,
        key: id,
        name: file.originalname
    };

    return db.insertPhoto(photo).then(() => photo);
}

export default file => {
    const id = idGenerator();
    return tempFileWriter(file)
        .then(({path}) => Promise.all(resizeToMultiple(path)))
        .then(resizedResults => Promise.all(upload(id, file, resizedResults)))
        .then(() => insertToDb(id, file))
        .then(photo => photoDataFormatter.dbToClient(photo, []));
};
