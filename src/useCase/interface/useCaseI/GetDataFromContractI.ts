import {ContractAddressResponse, ContractFetchResponse} from "@app/useCase/interface";
import {Errors} from "@app/errors";


export interface GetDataFromContractI {

    getByAddress(token: string): Promise<ContractFetchResponse[]|Errors>;
    getByHash(hash: string): Promise<ContractAddressResponse|Errors>;



}