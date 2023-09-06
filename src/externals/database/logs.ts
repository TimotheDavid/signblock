import {LogsDatabaseI} from "@app/useCase/interface/database";
import {Errors, TRANSACTION_INSERTED} from "../../errors";


export class LogsDatabase implements LogsDatabaseI {

    async insertTransaction(hash: string): Promise<Errors> {
        return TRANSACTION_INSERTED;
    }




}