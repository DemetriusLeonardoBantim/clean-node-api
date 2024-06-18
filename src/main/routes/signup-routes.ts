import { Router } from "express"
import { makesignUpController } from '../factories/signup'
import { adaptRoute } from '../adapters/express-route.adapter'

export default (router: Router): void => {
    router.post('/signup', adaptRoute(makesignUpController()))
}