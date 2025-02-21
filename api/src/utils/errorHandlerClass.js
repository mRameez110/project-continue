class AppError extends Error {
	constructor(message = "Internal Server Error", errorCode = 500) {
		super();
		this.message = message;
		this.errorCode = errorCode;
	}
}

class RouteNotFoundError extends AppError {
	constructor(message = "Route does't exist", errorCode = 404) {
		super(message, errorCode);
	}
}
class UserAlreadyExistError extends AppError {
	constructor(message = "User Already Exist", errorCode = 400) {
		super(message, errorCode);
	}
}

class BadRequestError extends AppError {
	constructor(message = "Bad Request", errorCode = 400) {
		super(message, errorCode);
	}
}

class ForbiddenError extends AppError {
	constructor(
		message = "You are not allowed to perform this action",
		errorCode = 403
	) {
		super(message, errorCode);
	}
}

class NotFoundError extends AppError {
	constructor(message = "No Records found", errorCode = 404) {
		super(message, errorCode);
	}
}

class InvalidCredentialError extends AppError {
	constructor(message = "Invalid Credential's", errorCode = 400) {
		super(message, errorCode);
	}
}

class ValidationError extends AppError {
	constructor(
		message = "must fill the required fields carefully",
		errorCode = 400
	) {
		super(message, errorCode);
	}
}

class MailError extends AppError {
	constructor(message = "Error in Mail generation/transfer", errorCode = 500) {
		super(message, errorCode);
	}
}

module.exports = {
	AppError,
	RouteNotFoundError,
	UserAlreadyExistError,
	BadRequestError,
	ForbiddenError,
	NotFoundError,
	ValidationError,
	InvalidCredentialError,
	MailError,
};
