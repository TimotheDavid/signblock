import {
    Errors,
    CONTRACT_SEND,
    CONTRACT_NOT_SEND,
    CANNOT_SEND_CONTRACT_ADDRESS,
    CANNOT_SEND_CONTRACT_HASH, CANNOT_GET_BY_ADDRESS
} from "../../errors";
import {ContractAddressResponse, ContractFetchResponse, ContractsI} from "../../useCase/interface";
import {AbiInput, Contract, AbiStruct, AbiFallbackFragment, Web3, Transaction, Bytes} from "web3";
import {} from "web3-utils";
import Initweb3 from "./initweb3";
const HashDescription = require("./contracts/HashContract.json");
const AddressDescription = require("./contracts/AddressContract.json");
import {ADDRESS_CONTRACT_ADDRESS, HASH_CONTRACT_ADDRESS, PERSONAL_ADDRESS, PERSONAL_KEY} from "../../env";
import {es} from "@faker-js/faker";
import * as stream from "stream";

export class Contracts implements ContractsI {

    private w3: Web3;
    private readonly hashAddress = HASH_CONTRACT_ADDRESS;
    private readonly addressContractAddress = ADDRESS_CONTRACT_ADDRESS;


    constructor() {
        this.w3 = Initweb3.getInstance().web3;
    }

    getHashContract(): Contract<typeof HashDescription> {
        return new Contract(HashDescription, HASH_CONTRACT_ADDRESS, this.w3)
    }

    getAddressContract(): Contract<typeof AddressDescription> {
        return new Contract(AddressDescription, ADDRESS_CONTRACT_ADDRESS, this.w3);
    }

    private getSetAddressRegistry(address: string, hash: string) {
        //@ts-ignore
        return this.getAddressContract().methods.setAddressRegistery(address, this.w3.utils.fromAscii(hash));
    }

    private getSetHashContract(address: string, hash: string)  {
        //@ts-ignore
        return this.getHashContract().methods.setDocument(this.w3.utils.fromAscii(hash), address);
    }

    private getByAddressAddress(address: string) {
        //@ts-ignore
        return this.getAddressContract().methods.getByAddress(address);
    }

    private async sendTx(address: string, hash: string, contract: any, addressContract: string): Promise<Errors|string> {


        let txResponse;
        try{
            const estimateGasAddress = await contract.estimateGas({from: PERSONAL_ADDRESS});
            const abi = contract.encodeABI();
            const tx =  await this.getAddressTransaction(estimateGasAddress, abi, addressContract);
            const signedAddress = await this.w3.eth.accounts.signTransaction(tx, PERSONAL_KEY);
            txResponse = await this.w3.eth.sendSignedTransaction(signedAddress.rawTransaction);

        }catch (error) {
            return CONTRACT_NOT_SEND
        }
        return txResponse.transactionHash.toString();
    }

    async getAddressTransaction(gas: bigint, contract: string, contractAddress: string) {
        return {
            from: PERSONAL_ADDRESS,
            to: contractAddress,
            gas: gas,
            gasPrice: await this.w3.eth.getGasPrice(),
            data: contract,
        } as Transaction
    }

    async sendContract(hash: string, address: string): Promise<{ addresstx: string, hashtx: string }|Errors>  {
        let addresstx: string | Errors;
        let hashtx: string | Errors;
        addresstx = await  this.sendTx(address, hash, await this.getSetAddressRegistry(address, hash), ADDRESS_CONTRACT_ADDRESS);
        hashtx = await this.sendTx(address, hash, this.getSetHashContract(address, hash), HASH_CONTRACT_ADDRESS);

        if (addresstx === CANNOT_SEND_CONTRACT_ADDRESS) {
            return addresstx
        }

        if(hashtx === CANNOT_SEND_CONTRACT_HASH) {
            return hashtx
        }

        return {
            hashtx:  hashtx as string ?? "",
            addresstx: addresstx as string ?? "",
        }
    }

    async getByAddress(address: string): Promise<ContractFetchResponse[] | Errors> {

        let data;
        try {
        const contract = this.getAddressContract();
        //@ts-ignore
        data = await contract.methods.getByAddress(address).call();
        }catch (error) {
            return CANNOT_GET_BY_ADDRESS;
        }

        const result = []
        //@ts-ignore
        for(const item of data) {
            const {payload, timestamp} = item;

            const response = new ContractFetchResponse();
            response.address = address;
            response.timestamp = this.w3.utils.fromDecimal(timestamp);
            response.data = payload;
            result.push(response);
        }
        return result;
    }

    async getByHash(hash: string): Promise<ContractAddressResponse | Errors> {
        let data;

        const bytes = this.w3.utils.fromAscii(hash);
        try {
            const contract = this.getHashContract();
            //@ts-ignore
            data = await contract.methods.getByHash(bytes).call();
        }catch (error) {

            console.log(error);
            return CANNOT_SEND_CONTRACT_HASH;
        }

        const response = new ContractAddressResponse();
        response.timestamp = ""
        response.address = data as  unknown as string;
        response.hash = hash;

        return response;





    }




}