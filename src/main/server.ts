import app from './config/app'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl).then(() => {
    app.listen(5050, () => console.log('Server running at http://localhost:5050'))
}).catch(console.error)
