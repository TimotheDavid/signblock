import {Accounts, Contracts} from "../../../src/externals";
import {fa, faker} from "@faker-js/faker";
import {CANNOT_SEND_CONTRACT_ADDRESS, CANNOT_SEND_CONTRACT_HASH, CONTRACT_SEND, Errors} from "../../../src/errors";
import * as utils from "../../utils";
import Account from "@app/domains/Account";
import {AccountI} from "@app/useCase/interface";





describe("it should send query to the contract", () => {


    const contract = new Contracts();
    const account = new Accounts();
    let initData = {};

    beforeEach(async () => {
        initData = await utils.getInitTest(account);
    })

    it("should query the address and the hash contract to enter a query inside", async () => {

        const init = await utils.getInitTest(account);
        const response = await contract.sendContract(utils.getBuffer(), init.address);
        expect(response).toBeInstanceOf(Object);
    })

    it("should not query the documents du to CANNOT_SEND_ADDRESS_CONTRACT ", async () => {
        const init = await utils.getInitTest(account);
        const sendTxFunction = jest.spyOn(contract as any, "sendTx");
        sendTxFunction.mockImplementation(async () => CANNOT_SEND_CONTRACT_ADDRESS);
        const response = await contract.sendContract(utils.getBuffer(), init.address);
        expect(response).toBe(CANNOT_SEND_CONTRACT_ADDRESS);
    })

    it("should not send the contracts du to CANNOT_SEND_ADDRESS_HASH", async () => {
        const init = await utils.getInitTest(account);
        const sendTxFunction = jest.spyOn(contract as any, "sendTx");
        sendTxFunction.mockImplementation(async () => CANNOT_SEND_CONTRACT_ADDRESS);
        const response = await contract.sendContract(utils.getBuffer(), init.address);
        expect(response).toBe(CANNOT_SEND_CONTRACT_ADDRESS);
    })






})