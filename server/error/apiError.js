class apiError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest = (msg) => new apiError(404, msg);
    static internal = (msg) => new apiError(500, msg);
    static forbidden = (msg) => new apiError(403, msg);
}

module.exports = apiError
