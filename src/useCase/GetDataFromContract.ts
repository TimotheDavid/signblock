import {
    ContractAddressResponse,
    ContractFetchResponse,
    ContractsI,
    GetDataFromContractI,
    LogsDatabaseI,
    UserDatabaseI,
    VaultI
} from "@app/useCase/interface";
import {CANNOT_FETCH_PERSONAL_KEY, Errors} from "../errors";
import {PERSONAL_ADDRESS, PERSONAL_KEY_ADDRESS} from "../env";


export class GetDataFromContract implements GetDataFromContractI {

    private vault: VaultI;
    private user: UserDatabaseI;
    private logs: LogsDatabaseI;
    private contract: ContractsI


    constructor(vault: VaultI, user: UserDatabaseI, logs: LogsDatabaseI, contract: ContractsI) {
        this.contract = contract;
        this.logs = logs;
        this.user = user;
        this.vault = vault;
    }

    async getByAddress(token: string): Promise<ContractFetchResponse[] | Errors> {

        const user = await this.user.getUserByToken(token);

        if (user instanceof  Errors) {
            return  user;
        }

        const key = await this.vault.getKey(PERSONAL_KEY_ADDRESS);

        if(key instanceof Errors) {
            return CANNOT_FETCH_PERSONAL_KEY;
        }

        const contractResponse  = await this.contract.getByAddress(user.address, PERSONAL_ADDRESS, key);

        if(contractResponse instanceof Errors) {
            return contractResponse;
        }

        return contractResponse;
    }

    async getByHash(hash: string): Promise<ContractAddressResponse | Errors> {

        const personalKey = await this.vault.getKey(PERSONAL_KEY_ADDRESS);

        if( personalKey instanceof Errors) {
            return CANNOT_FETCH_PERSONAL_KEY;
        }

        return  this.contract.getByHash(hash, PERSONAL_ADDRESS, personalKey);


    }








}