
import {AccountI, UserDatabaseI, VaultI} from "@app/useCase/interface";
import {
    CANNOT_CREATE_ACCOUNT,
    Errors,
    USER_CREATED,
    USER_EXIST,
    USER_UPDATED,
    USER_NOT_EXISTS,
    USER_DELETED,
    CANNOT_INSERT_KEY_VAULT
} from "../errors";
import { User } from "../domains";
import UserUseCaseI from "./interface/useCaseI/UserUseCaseI";


export class UsersUseCase implements UserUseCaseI {

    private vault: VaultI;
    private account: AccountI;
    private user: UserDatabaseI;


    constructor(vault: VaultI, account: AccountI, user: UserDatabaseI) {
        this.account = account;
        this.user = user;
        this.vault = vault;

    }


    async createUser(userToken:string, email:string): Promise<Errors> {

        const user = await this.user.getUserByMail(email);
        if(user instanceof  User) {
            return USER_EXIST;
        }

        const account = await this.account.createAccount();

        if(account instanceof  Errors) {
            return CANNOT_CREATE_ACCOUNT;
        }

        const vault = await this.vault.insertVault(account.key);

        if(vault instanceof Errors) {
            return CANNOT_INSERT_KEY_VAULT
        }

        await this.user.createAccount(email, userToken, vault);

        return USER_CREATED;

    }

    async getUserToken(token: string): Promise<User | Errors> {
        const user = await this.user.getUserByToken(token);
        return user;
    }

    async updateUser(token: string, user: User): Promise<Errors> {

        const fetchUser = await this.user.getUserByToken(token);

        if(fetchUser instanceof  Errors) {
            return USER_NOT_EXISTS;
        }
        await this.user.updateUser(token, user);
        return USER_UPDATED;
    }

    async deleteUser(token: string): Promise<Errors> {

        const user = await this.user.getUserByToken(token);

        if (user instanceof  Errors) {
            return USER_NOT_EXISTS
        }

        await this.user.deleteUser(token);
        return USER_DELETED
    }






}