import Account from "@app/domains/Account";
import {Errors} from "@app/errors";


export  default interface AccountWeb3I {

    createAccount(): Promise<Account|Errors>




}