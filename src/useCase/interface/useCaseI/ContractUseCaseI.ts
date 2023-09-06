import { Errors } from "../../../errors";

export interface ContractUseCaseI {

    sendContract(file: Buffer, token: string): Promise<Errors>



}