import { User } from "../../domains";
import {UserDatabaseI} from "@app/useCase/interface";
import {USER_CREATED, USER_DELETED, USER_UPDATED} from "../../errors";
import { Errors } from "../../errors/Errors";



export class UserDatabase implements UserDatabaseI{
    deleteUser(token: string): Promise<Errors> {
        return Promise.resolve(USER_DELETED);
    }
    updateUser(token: string, user: User): Promise<Errors> {
        return Promise.resolve(USER_UPDATED)
    }
    getUserByToken(token: string): Promise<User | Errors> {
        return Promise.resolve(new User());
    }

    createAccount(mail: string, token: string): Promise<Errors> {
        return Promise.resolve(USER_CREATED);
    }

    getUserByMail(mail: string): Promise<User|Errors> {
        return Promise.resolve(new User());
    }
}