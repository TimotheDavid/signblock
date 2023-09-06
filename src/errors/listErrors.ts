import { Errors } from "./Errors";

export const USER_EXIST =new Errors(501, "the user already exist in the database, signing instead", "USER_EXIST");
export const USER_NOT_EXISTS = new Errors(201, "the user does not exist for the moment", "USER_NOT_EXISTS");
export const USER_CREATED = new Errors(202, "the user have been created", "USER_CREATED");
export const CANNOT_CREATE_ACCOUNT = new Errors(502, "cannot create account errors", "CANNOT_CREATE_ACCOUNT");
export const USER_UPDATED = new Errors(503, "the user have been updated", "USER_UPDATED");
export const USER_DELETED = new Errors(504, "user have been deleted with success", "USER_DELETED");
export const CONTRACT_SEND = new Errors(505, "the contract have been send", "CONTRACT_SEND");
export const CANNOT_FETCH_THE_KEY = new Errors(506, "the key cannot be fetched", "CANNOT_FETCH_THE_KEY");
export const CANNOT_INSERT_KEY_VAULT =  new Errors(507, "the key cannot be insert in the vault, you need to recreate the account", "CANNOT_INSERT_KEY_VAULT");
export const CANNOT_GET_HASH_DOCUMENTS = new Errors(508, "the hash cannot be get from the files, need to update the files", "CANNOT_GET_HASH_DOCUMENTS");
export const CONTRACT_NOT_SEND = new Errors(509, "error in the contract, the contract have been reverted", "CONTRACT_NOT_SEND");
export const TRANSACTION_INSERTED = new Errors(510, "the transaction was inserted in the database", "TRANSACTION_INSERTED");
export const CANNOT_INSERT_TX = new Errors(511, "cannot insert the hash of the transaction in the database", "CANNOT_INSERT_TX");
export const CANNOT_FETCH_PERSONAL_KEY = new Errors(512, "cannot fetch the key of the project, the admin will resolve", "CANNOT_FETCH_PERSONAL_KEY");
export const CANNOT_SEND_CONTRACT_ADDRESS = new Errors(513, "the contract have not been sent, the errors is in address send problems", "CANNOT_SEND_CONTRACT_ADDRESS");
export const CANNOT_SEND_CONTRACT_HASH = new Errors(514, "the contract have not been sent, the errors is in hash send problems", "CANNOT_SEND_CONTRACT_HASH");
export const CANNOT_GET_BY_ADDRESS= new Errors(515, "the contract don't get the data from the GetByAddress, error in GetByAddress", 'CANNOT_GET_BY_ADDRESS');