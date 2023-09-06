import {Errors} from "@app/errors";


export interface LogsDatabaseI {
    insertTransaction(hashtx: string, addresstx: string, address: string): Promise<Errors>;

}