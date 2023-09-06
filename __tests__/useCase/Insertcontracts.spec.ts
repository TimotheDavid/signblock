import {ContractsI, DocumentsI, UserDatabaseI, VaultI, LogsDatabaseI } from "../../src/useCase/interface";
import { VaultKMS, UserDatabase, Documents,Contracts, LogsDatabase  } from "../../src/externals";
import {InsertContractsUseCase} from "../../src/useCase";
import * as utils  from "../utils";
import { User } from "../../src/domains";
import {fa, faker, fi} from "@faker-js/faker";
import {
    CONTRACT_SEND,
    CANNOT_FETCH_THE_KEY,
    CANNOT_GET_HASH_DOCUMENTS,
    USER_NOT_EXISTS,
    CONTRACT_NOT_SEND, TRANSACTION_INSERTED, CANNOT_INSERT_TX
} from "../../src/errors";



function filesBuffer() {
    return Buffer.from(faker.string.alphanumeric(500));




}

function getInstance(vault: VaultI, contract: ContractsI, user: UserDatabaseI, documents: DocumentsI, logs: LogsDatabaseI) {
    return new InsertContractsUseCase(vault, contract,user, documents, logs);
}



describe('test all the contracts methods', function () {

    const vault = new VaultKMS();
    const contract = new Contracts();
    const user = new UserDatabase();
    const documents = new Documents();
    const logs = new LogsDatabase();

    it('should insert in a contract', async () => {
        jest.spyOn(vault, "getKey").mockImplementation(async () => Promise.resolve(faker.string.alphanumeric(256)));
        jest.spyOn(documents, "findHash").mockImplementation(() => Promise.resolve(utils.getBuffer()));
        jest.spyOn(user, "getUserByToken").mockImplementation(async () =>  {
            const user = new User();
            user.address = faker.string.alphanumeric(128);
            return user;
        })
        jest.spyOn(contract, "sendContract").mockImplementation(async () => Promise.resolve(CONTRACT_SEND))
        jest.spyOn(logs, "insertTransaction").mockImplementation(async () => Promise.resolve(TRANSACTION_INSERTED))
        const instance = getInstance(vault, contract, user, documents,logs);
        const result = await instance.sendContract(filesBuffer(), faker.string.uuid());
        expect(result).toBe(CONTRACT_SEND);
    })

    it("should not insert a contract du too errors in vault getKey", async () => {
        jest.spyOn(user, "getUserByToken").mockImplementation(async () =>  {
            const user = new User();
            user.address = faker.string.alphanumeric(128);
            return user;
        });
        jest.spyOn(vault, "getKey").mockImplementation(async () => Promise.resolve(CANNOT_FETCH_THE_KEY));
        const instance = getInstance(vault, contract, user, documents, logs);
        const result = await instance.sendContract(filesBuffer(), faker.string.uuid());
        expect(result).toBe(CANNOT_FETCH_THE_KEY);
    })

    it("should not insert du too the hash as a error", async () => {
        jest.spyOn(user, "getUserByToken").mockImplementation(async () =>  {
            const user = new User();
            user.address = faker.string.alphanumeric(128);
            return user;
        })
        jest.spyOn(vault, "getKey").mockImplementation(async () => Promise.resolve(faker.string.alphanumeric(256)));
        jest.spyOn(documents, "findHash").mockImplementation(() => Promise.resolve(CANNOT_GET_HASH_DOCUMENTS));
        const instance = getInstance(vault, contract, user, documents, logs);
        const result = await instance.sendContract(filesBuffer(), faker.string.uuid());
        expect(result).toBe(CANNOT_GET_HASH_DOCUMENTS);
    })

    it("should not insert du too error in the getUserByToken", async () => {
        jest.spyOn(user, "getUserByToken").mockImplementation(async () =>  Promise.resolve(USER_NOT_EXISTS));
        const instance = getInstance(vault, contract, user, documents, logs);
        const result = await instance.sendContract(filesBuffer(), faker.string.uuid());
        expect(result).toBe(USER_NOT_EXISTS);
    })


    it("should not send a contract du too errors", async () => {
        jest.spyOn(user, "getUserByToken").mockImplementation(async () =>  {
            const user = new User();
            user.address = faker.string.alphanumeric(128);
            return user;
        })
        jest.spyOn(vault, "getKey").mockImplementation(async () => Promise.resolve(faker.string.alphanumeric(256)));
        jest.spyOn(documents, "findHash").mockImplementation(() => Promise.resolve(utils.getBuffer()));
        jest.spyOn(contract, "sendContract").mockImplementation(async () => Promise.resolve(CONTRACT_NOT_SEND));
        const instance = getInstance(vault, contract, user, documents, logs);
        const result = await instance.sendContract(filesBuffer(), faker.string.uuid());
        expect(result).toBe(CONTRACT_NOT_SEND);
    })


    it("shound not insert the transaction id in the database", async () => {
        jest.spyOn(user, "getUserByToken").mockImplementation(async () =>  {
            const user = new User();
            user.address = faker.string.alphanumeric(128);
            return user;
        })
        jest.spyOn(vault, "getKey").mockImplementation(async () => Promise.resolve(faker.string.alphanumeric(256)));
        jest.spyOn(documents, "findHash").mockImplementation(() => Promise.resolve(utils.getBuffer()));
        jest.spyOn(contract, "sendContract").mockImplementation(async () => Promise.resolve(CONTRACT_SEND));
        jest.spyOn(logs, "insertTransaction").mockImplementation(async () => Promise.resolve(CANNOT_INSERT_TX));
        const instance = getInstance(vault, contract, user, documents, logs);
        const result = await instance.sendContract(filesBuffer(), faker.string.uuid());
        expect(result).toBe(CANNOT_INSERT_TX);



    })
});