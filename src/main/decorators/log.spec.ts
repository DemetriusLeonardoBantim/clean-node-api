import { LogControllerDecorator } from "./log"

describe('LogController Decorator', () => {
    test('Should call controller handle', () => {
        const sut = new LogControllerDecorator()
        const httpRequest = {
            body: {
                email: 'any_mail@mail.com',
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        sut.handle(httpRequest)
    })
})