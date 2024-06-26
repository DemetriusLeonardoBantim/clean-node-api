
import { DbAddAccount } from "./db-add-account"
import { AccountModel, AddAccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'


const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }
    return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        async add(accountData: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_email',
                password: 'hashed_password'
            }
            return new Promise(resolve => resolve(fakeAccount))
        }
    }
    return new AddAccountRepositoryStub()
}

interface SutTypes {
    sut: DbAddAccount
    encrypterStub: Encrypter
    addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
    const addAccountRepositoryStub = makeAddAccountRepository()
    const encrypterStub = makeEncrypter()
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
    return {
        sut,
        encrypterStub,
        addAccountRepositoryStub
    }
}

describe('DbAddAccount UseCase', () => {
    test('Should call Encrypter with correct password', async () => {
        const { encrypterStub, sut } = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'
        }
        await sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })

    /*     test('Should throw if Encrypter throws', async () => {
            const { encrypterStub, sut } = makeSut()
            jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
            const accountData = {
                name: 'valid_name',
                email: 'valid_email',
                password: 'valid_password'
            }
            const promise = sut.add(accountData)
            expect(promise).rejects.toThrow()
        }) */

    test('Should call AddAccountRepository with correct values ', async () => {
        const { addAccountRepositoryStub } = makeSut()
        const accountData = {
            name: 'valid_name',
            id: "valid_id",
            email: 'valid_email',
            password: 'valid_password'
        }
        const responseHashed = await addAccountRepositoryStub.add(accountData)
        expect(responseHashed).toEqual({
            name: 'valid_name',
            id: "valid_id",
            email: 'valid_email',
            password: 'hashed_password'
        })
    })

    test('Should return an account on sucess ', async () => {
        const { sut } = makeSut()
        const accountData = {
            name: 'valid_name',
            id: "valid_id",
            email: 'valid_email',
            password: 'valid_password'
        }
        const account = await sut.add(accountData)
        expect(account).toEqual({
            name: 'valid_name',
            id: "valid_id",
            email: 'valid_email',
            password: 'hashed_password'
        })
    })
})