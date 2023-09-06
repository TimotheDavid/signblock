import Account from "@app/domains/Account";
import { Errors } from "../../../errors/Errors";


export interface AccountI  {
    createAccount(): Promise<Account|Errors>

}