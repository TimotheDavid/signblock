import Account from "./Account";



export class User {

    email: string;
    account: Account;
    token: string;
    address: string;
    key: string


    constructor() {
        this.email = "";
        this.account = new Account("", "");
        this.token = "";
        this.address = "";
        this.key = "";
    }

    set setAccount(account: Account) {
        this.account = account;
    }

    set setEmail(email: string) {
        this.email = email;
    }

    set setToken(token: string) {
        this.token = token;
    }

    set setAddress(address: string) {
        this.address = address;
    }

    set setKey(key: string) {
        this.key = key;
    }

}