import { MongoHelper as sut } from "./mongo-helper"

describe('Mongo helper', () => {
    beforeAll(async () => {
        await sut.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await sut.disconnect()
    })

    test('Should reconnect is down', async () => {
        let accountCollection = await sut.getCollection('accounts')
        expect(accountCollection).toBeTruthy()
        await sut.disconnect()

        accountCollection = sut.getCollection('accounts')
        expect(accountCollection).toBeTruthy()

    })
})