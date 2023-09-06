import {Accounts, Contracts} from "../../../src/externals";
import * as utils from "../../utils";
import {ContractFetchResponse} from "../../../src/useCase/interface";
import {CANNOT_GET_BY_ADDRESS} from "../../../src/errors";

describe('get the document by address of signer',  function () {


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



    it("should get the document by address", async () => {
        const response = await contract.getByAddress(address);
        expect(response).toBeInstanceOf(Array);
    })

    it("should  not get by address with errors CANNOT_GET_BY_ADDRESS", async () => {
        jest.spyOn(contract, "getAddressContract").mockImplementation(() => { throw  new Error()})
        const response = await contract.getByAddress(address);
        expect(response).toBe(CANNOT_GET_BY_ADDRESS)
    })



});