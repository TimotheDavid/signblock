import AccountWeb3I from "@app/externals/web3/interfaces/AccountWeb3I";
import Account from "../../domains/Account";
import Initweb3 from "../../../src/externals/web3/initweb3";
import {CANNOT_CREATE_ACCOUNT, Errors} from "../../errors";


export class Accounts implements  AccountWeb3I {

    private w3 = Initweb3.getInstance().web3;

    async createAccount(): Promise<Account|Errors> {

        const account =  this.w3.accountProvider?.create();

        if( account ==  undefined) {
            return CANNOT_CREATE_ACCOUNT;
        }

        return new Account(account.address, account.privateKey);




    }



}