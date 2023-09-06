

export default class    Account {

    public address: string;
    public key: string;

    constructor(address: string, key: string) {
        this.key = key;
        this.address = address;
    }
}