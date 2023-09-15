export class UnauthenticatedError extends Error {

    constructor() {
        super("You are currently not signed in, please signin!");
        this.name = "UnauthenticatedError";
    }
}