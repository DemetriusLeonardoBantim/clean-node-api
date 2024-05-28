import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'

export class BcryptAdapter implements Encrypter {
    private readonly salt: number
    constructor(salt: number) {
        this.salt = salt
    }

    encrypt(value: string): Promise<string> {
        bcrypt.hash(value, 12)
        return new Promise((resolve) => resolve(('any_value')))
    }
}