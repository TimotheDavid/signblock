import {Web3} from "web3";
import {TRPC_URL} from "../../env";


export default class Initweb3 {

    private TRPC_URL = TRPC_URL ?? "";
    private  static  instance: Initweb3;
    public web3: Web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider(this.TRPC_URL));
    static getInstance(): Initweb3 {
        if(!Initweb3.instance) {
            Initweb3.instance = new Initweb3();
        }
        return Initweb3.instance;
    }





}