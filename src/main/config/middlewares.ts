import { Express } from 'express'
import { bodyParser } from '../midlewares/body-parser'
import { contentType } from '../midlewares/content-type'
import { cors } from '../midlewares/cors'
import routes from './routes'

export default (app: Express): void => {
    app.use(bodyParser)
    app.use(cors)
    app.use(contentType)
}