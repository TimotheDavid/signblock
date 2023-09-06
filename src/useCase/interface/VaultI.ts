import {Errors} from "@app/errors";

export interface VaultI {

    insertVault(key: string): Promise<string|Errors>;
    getKey(key: string): Promise<string|Errors>;
}