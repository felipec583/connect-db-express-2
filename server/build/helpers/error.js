class RequestError extends Error {
    constructor(statusCode, message) {
        super();
        this.checkCode = (code) => {
            const check = this.PSQL_CODES.find((psqlCode) => psqlCode === code);
            switch (check) {
                case "42601":
                    this.message = "Incorrect SQL statement. Check it out";
                    this.statusCode = 400;
                    break;
                case "23502":
                    this.message = "You should enter all the NOT NULL values";
                    this.statusCode = 400;
                    break;
                case "22P02":
                    this.message = "Stick to the correct data types";
                    this.statusCode = 400;
                default:
                    this.message = this.message;
                    this.statusCode = this.statusCode;
            }
        };
        this.statusCode = statusCode;
        this.message = message;
        this.PSQL_CODES = ["42601", "23502", "22P02"];
    }
}
const createError = (statusCode, message, code) => {
    const newError = new RequestError(statusCode, message);
    newError.checkCode(code);
    return newError;
};
export { createError, RequestError };
