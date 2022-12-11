const CustomError = require("./custom-error");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");
const UnauthorizedError = require("./unauthorized");
const UnauthenticatedError = require("./unauthenticated");

module.exports = {
    CustomError,
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
    UnauthenticatedError,
};