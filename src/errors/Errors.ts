

export class Errors extends Error {

    private code: number;
    message: string;
    name: string

    constructor(code: number, message: string, name: string) {
        super();
        this.code = code;
        this.message = message;
        this.name = name;
    }








}