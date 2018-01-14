import db from '../../db'
import {base} from '../constants'
import * as photoDataFormatter from '../photo-data-formatter'

export default () => (
    db.list('photos').then(photos => ({
      base,
      photos: photoDataFormatter.dbToClient(photos)
    }))
)
