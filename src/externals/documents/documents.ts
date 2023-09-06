import { Errors } from "@app/errors";
import {DocumentsI} from "@app/useCase/interface";


export class Documents implements DocumentsI {
    async findHash(file: Buffer): Promise<string | Errors> {

        return Promise.resolve("");
    }
}