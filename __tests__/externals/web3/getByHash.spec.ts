import {Accounts, Contracts} from "../../../src/externals";
import * as utils from "../../utils";
import arrayContaining = jasmine.arrayContaining;
import {CANNOT_SEND_CONTRACT_HASH} from "../../../src/errors";
import {ContractAddressResponse} from "../../../src/useCase/interface";

describe('get By Hash test', function () {

    const contract = new Contracts();
    const account = new Accounts();
    let address = "";
    let hash = "";

    beforeAll(async () => {
        const payload = await utils.getInitTest(account);
        address = payload.address;
    } )

    beforeEach(async () => {
        const payload = await utils.getInitTest(account);
        hash = payload.hash;
        await contract.sendContract(hash, address);
    })

    it.only("should get By Hash", async () => {
        const response = await contract.getByHash(hash);
        expect(response).toBeInstanceOf(ContractAddressResponse);
    });

    it("should not get by Hash, du too error CANNOT_GET_BY_HASH", async () => {
        jest.spyOn(contract, "getHashContract").mockImplementation(() => {throw  new Error()});
        const response = await contract.getByHash(hash);
        expect(response).toBe(CANNOT_SEND_CONTRACT_HASH);





    })


});