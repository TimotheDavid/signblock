import { User } from "@app/domains";
import {Errors } from "@app/errors/Errors";


export default interface UserUseCaseI {

    createUser(userToken: string, email: string ): Promise<Errors>;
    updateUser(token: string, user: User): Promise<Errors>;
    deleteUser(token: string): Promise<Errors>;
    getUserToken(token: string): Promise<User| Errors>;

}