import { Errors } from "@app/errors";
import {ContractFetchResponse, ContractAddressResponse} from "@app/useCase/interface";



export interface ContractsI {

    sendContract(hash: string, address: string): Promise<{ addresstx: string, hashtx: string }|Errors>
    getByAddress(address: string, personal_address: string, personal_key: string): Promise<ContractFetchResponse[]|Errors>;
    getByHash(hash: string, personal_address: string, personal_key: string): Promise<ContractAddressResponse|Errors>;

}