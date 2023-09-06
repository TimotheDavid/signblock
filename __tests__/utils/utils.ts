import {faker} from "@faker-js/faker";
import {AccountI} from "@app/useCase/interface";
import Account from "@app/domains/Account";


export function getBuffer(): string {
    const buf = Buffer.from(faker.string.alphanumeric(100));
    return Buffer.concat([buf], 32).toString();
}

export async function getInitTest(account: AccountI) {
    const testAccount = await account.createAccount() as Account;
    const hash = faker.string.alphanumeric(32);
    const address = testAccount.address;

    return {testAccount, hash, address};
}