import {VaultI} from "@app/useCase/interface";
import {Errors} from "@app/errors";


export class VaultKMS implements VaultI{
    getKey(key: string): Promise<string|Errors> {
        return Promise.resolve("");
    }

    insertVault(key: string): Promise<string|Errors> {
        return Promise.resolve("");
    }




}