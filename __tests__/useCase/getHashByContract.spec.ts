import {Contracts, LogsDatabase, UserDatabase, VaultKMS} from "../../src/externals";
import {
    ContractAddressResponse,
    ContractFetchResponse,
    ContractsI,
    LogsDatabaseI,
    UserDatabaseI,
    VaultI
} from "../../src/useCase/interface";
import {GetDataFromContract} from "../../src/useCase/GetDataFromContract";
import {User} from "../../src/domains";
import {fa, faker} from "@faker-js/faker";


function getInstance(vault: VaultI, user: UserDatabaseI, logs: LogsDatabaseI, contract: ContractsI) {
    return new GetDataFromContract(vault, user, logs, contract);


}

describe("describe the test for get Hash by contract", () => {
    const vault = new VaultKMS();
    const user = new UserDatabase();
    const logs = new LogsDatabase();
    const contract = new Contracts();

    it("should fetch the hashes from the desired address", async () => {
        const contractResponse = new ContractFetchResponse();
        contractResponse.data = "aabbcc";
        contractResponse.address = faker.string.alphanumeric(128);
        contractResponse.timestamp = new Date().toISOString();
        jest.spyOn(user, "getUserByToken").mockImplementation(async () => Promise.resolve(new User()));
        jest.spyOn(contract, "getByAddress").mockImplementation(async () => [contractResponse]);
        const instance = getInstance(vault, user, logs, contract);

        const result = await instance.getByAddress(faker.string.uuid());
        expect(result).toEqual([contractResponse]);
    })

    it("should get by hash of documents, when the document has input", async () => {

        const response = new ContractAddressResponse();
        response.timestamp = new Date().toISOString();
        response.hash = faker.string.alphanumeric(5);
        response.address = faker.string.alphanumeric(128);

        jest.spyOn(user, "getUserByToken").mockImplementation(async () => Promise.resolve(new User()));
        jest.spyOn(contract, "getByHash").mockImplementation(async () => response);

        const instance = getInstance(vault, user, logs, contract);
        const result = await instance.getByHash(faker.string.alphanumeric(5));
        expect(result).toEqual(response);
    })
})