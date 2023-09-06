import {
    CANNOT_FETCH_PERSONAL_KEY,
    CANNOT_FETCH_THE_KEY,
    CANNOT_GET_HASH_DOCUMENTS, CANNOT_INSERT_TX,
    CONTRACT_NOT_SEND,
    CONTRACT_SEND,
    Errors,
    USER_NOT_EXISTS
} from "../errors";
import {ContractsI, ContractUseCaseI, DocumentsI, LogsDatabaseI, UserDatabaseI, VaultI} from "@app/useCase/interface";


export class InsertContractsUseCase implements ContractUseCaseI {

    private vault: VaultI;
    private contract: ContractsI;
    private user: UserDatabaseI;
    private documents: DocumentsI;
    private logs: LogsDatabaseI;


    constructor(vault: VaultI, contract: ContractsI, user: UserDatabaseI, documents: DocumentsI, logs: LogsDatabaseI) {
        this.contract = contract;
        this.vault = vault;
        this.user = user;
        this.documents = documents;
        this.logs = logs;
    }

    async sendContract(file: Buffer, token: string): Promise<Errors> {

        const user = await this.user.getUserByToken(token);

        if(user instanceof  Errors) {
            return USER_NOT_EXISTS;
        }

        const key = await this.vault.getKey(user.key);

        if (key instanceof  Errors) {
            return CANNOT_FETCH_THE_KEY;
        }

        const hash = await this.documents.findHash(file);

        if(hash instanceof Errors) {
            return CANNOT_GET_HASH_DOCUMENTS;
        }

        const contract = await this.contract.sendContract(hash, user.address);

        if (contract === CONTRACT_NOT_SEND) {
            return CONTRACT_NOT_SEND;
        }

        const response = contract as unknown as  {addresstx: string, hashtx: string};

        const insertTx = await this.logs.insertTransaction(response.addresstx, response.hashtx, user.address);

        if (insertTx === CANNOT_INSERT_TX) {
            return CANNOT_INSERT_TX;
        }

        return CONTRACT_SEND
    }
}