import {Errors} from "../../../errors/Errors";
import {User} from "@app/domains";


export interface UserDatabaseI {

    getUserByMail(mail: string): Promise<User|Errors>;
    createAccount(mail: string, token: string, vaultKey: string): Promise<Errors>;
    getUserByToken(token: string): Promise<User|Errors>;
    updateUser(token: string, user: User): Promise<Errors>;
    deleteUser(token: string): Promise<Errors>;

};