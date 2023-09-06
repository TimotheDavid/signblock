import * as stream from "stream";


export class ContractFetchResponse {

    data: string;
    timestamp: string;
    address: string;

    constructor() {
        this.data  = "";
        this.timestamp = "";
        this.address = "";
    }

    set setData(data: string) {
        this.data = data;
    }


    set setTimestamp(timestamp: string) {
        this.timestamp = timestamp;
    }

    set setAddress(address: string) {
        this.address = address;
    }

}