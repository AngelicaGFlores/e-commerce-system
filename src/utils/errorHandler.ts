export class IDError extends Error {
	id?: number;
	constructor(message: string, id?: number) {
		super(message);
		this.name = "IDError";
		this.id = id;
	}
}

export class APIError extends Error {
	statusCode?: number;
	constructor(message: string, statusCode?: number) {
		super(message);
		this.name = "APIError";
		this.statusCode = statusCode;
	}
}

export function handleAPIError(error: any) {
	if (error instanceof APIError && error.statusCode) {
		console.error(
			"API Error:",
			error.message,
			"Status Code:",
			error.statusCode
		);
	} else if (error instanceof IDError) {
		console.error(
			`The database does not contain an object with id ${error.id}`
		);
	} else {
		console.error("An unexpected error occured:", error.message);
	}
}

export function handleIDError(error: any) {
	if (error.id) {
		console.error(
			`The database does not contain an object with id ${error.id}`
		);
	} else {
		console.error(error.message);
	}
}
