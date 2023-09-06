
import {USER_CREATED, USER_DELETED, USER_EXIST, USER_NOT_EXISTS, USER_UPDATED} from "../../src/errors";
import {UsersUseCase}  from "../../src/useCase";
import {AccountI, UserDatabaseI, VaultI} from "../../src/useCase/interface";
import {fa, faker} from "@faker-js/faker";
import {Accounts, UserDatabase, VaultKMS} from "../../src/externals";
import Account from "../../src/domains/Account";
import { User } from "../../src/domains";


function getInstance(vault: VaultI, accounts: AccountI, user: UserDatabaseI) {
    return new UsersUseCase(vault, accounts, user);



}

describe('test users ', function () {


    const vault = new VaultKMS();
    const accounts = new Accounts();
    const userDatabase = new UserDatabase();



    it("should create an user", async () => {
        jest.spyOn(vault, 'insertVault').mockImplementation(async () => Promise.resolve(faker.string.alphanumeric(10)));
        jest.spyOn(userDatabase, "getUserByMail").mockImplementation(async () => USER_NOT_EXISTS);
        jest.spyOn(accounts, 'createAccount').mockImplementation(async () => new Account(faker.finance.ethereumAddress(), faker.string.alphanumeric(258)))
        const instance = getInstance(vault, accounts, userDatabase);
        const result = await instance.createUser(faker.internet.email(), faker.string.uuid());
        expect(result).toBe(USER_CREATED);
    });

    it("should not create an user du to user exist with email", async () => {

        jest.spyOn(userDatabase,  "getUserByMail").mockImplementation(async () => new User());
        const instance = getInstance(vault, accounts, userDatabase);
        const result = await instance.createUser(faker.internet.email(), faker.string.uuid());
        expect(result).toBe(USER_EXIST);
    })

    it("should update an user", async () => {

        jest.spyOn(userDatabase, "getUserByToken").mockImplementation(async () => new User());
        jest.spyOn(userDatabase, "updateUser").mockImplementation(async () => Promise.resolve(USER_UPDATED));

        const instance = getInstance(vault, accounts, userDatabase);
        const result = await instance.updateUser(faker.string.uuid(), new User());
        expect(result).toBe(USER_UPDATED);
    })

    it("should not update an user du to user not found", async () => {

        jest.spyOn(userDatabase, "getUserByToken").mockImplementation(async () => Promise.resolve(USER_NOT_EXISTS));
        const instance = getInstance(vault, accounts, userDatabase);
        const result = await instance.updateUser(faker.string.uuid(), new User());
        expect(result).toBe(USER_NOT_EXISTS);
    } )

    it("should delete an user", async () => {

        jest.spyOn(userDatabase, "getUserByToken").mockImplementation(async () => Promise.resolve(new User()));
        jest.spyOn(userDatabase, "deleteUser").mockImplementation(async () => Promise.resolve(USER_DELETED));
        const instance = getInstance(vault, accounts, userDatabase);
        const result = await instance.deleteUser(faker.string.uuid());
        expect(result).toBe(USER_DELETED);

    });

    it("should not delete an user du to user not found", async () => {

        jest.spyOn(userDatabase, "getUserByToken").mockImplementation(async () => Promise.resolve(USER_NOT_EXISTS));
        jest.spyOn(userDatabase, "deleteUser").mockImplementation(async () => Promise.resolve(USER_NOT_EXISTS));
        const instance = getInstance(vault, accounts, userDatabase);
        const result = await instance.deleteUser(faker.string.uuid());
        expect(result).toBe(USER_NOT_EXISTS);



    })



});