import { Errors } from "@app/errors";


export interface DocumentsI {

    findHash(file: Buffer): Promise<Errors|string>

}