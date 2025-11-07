import {
	IDError,
	APIError,
	handleAPIError,
	handleIDError,
} from "../utils/errorHandler";

const BASE_URL = "https://dummyjson.com";

function checkId(id: number) {
	if (id < 1) {
		throw new IDError("The id must be a number bigger than or equal to 1!");
	}

	if (!Number.isInteger(id)) {
		throw new IDError("The id must be an integer!");
	}
}

export async function fetchProducts() {
	try {
		const response = await fetch(`${BASE_URL}/products`);

		if (!response.ok) {
			throw new APIError("Error fetching data from API", response.status);
		}

		const data = await response.json();
		return data.products;
	} catch (error) {
		console.error(error);
	}
}

export async function fetchProduct(id: number) {
	try {
		checkId(id);
		const response = await fetch(`${BASE_URL}/products/${id}`);
		if (!response.ok) {
			throw new APIError("Error fetching data from API", response.status);
		}
		const product = await response.json();
		return product;
	} catch (error) {
		if (error instanceof IDError) {
			handleIDError(error);
		} else if (error instanceof APIError) {
			handleAPIError(error);
		} else {
			console.log("Unknown Error!");
		}
	}
}

export async function fetchProductsSorted(
	sortBy: string,
	order: "asc" | "desc"
) {
	try {
		const response = await fetch(
			`${BASE_URL}/products?sortBy=${sortBy}&order=${order}`
		);
		if (!response.ok) {
			throw new APIError(
				"Please enter a valid product property and a valid order option: asc or desc",
				response.status
			);
		}

		const productList = await response.json();
		return productList.products;
	} catch (error) {
		handleAPIError(error);
	}
}

export async function fetchProductsByCategory(category: string) {
	try {
		const response = await fetch(`${BASE_URL}/products/category/${category}`);
		if (!response.ok) {
			throw new APIError("Please enter a valid category!", response.status);
		}
		const categories = await response.json();
		return categories.products;
	} catch (error) {
		handleAPIError(error);
	}
}

export async function addProduct(body: string) {
	try {
		const response = await fetch(`${BASE_URL}/products/add`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: body,
		});

		if (!response.ok) {
			throw new APIError(
				"Failed to add the provided product details to the database!",
				response.status
			);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		handleAPIError(error);
	}
}

export async function updateProduct(id: number, body: string) {
	try {
		const options = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: body,
		};
		const response = await fetch(`${BASE_URL}/products/${id}`, options);
		if (!response.ok) {
			throw new APIError("The product can not be updated", response.status);
		}
		return await response.json();
	} catch (error) {
		handleAPIError(error);
	}
}

export async function deleteProduct(id: number) {
	try {
		const response = await fetch(`${BASE_URL}/products/${id}`, {
			method: "DELETE",
		});
		checkId(id);
		if (!response.ok) {
			throw new APIError("A network error occured!", response.status);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof IDError) {
			handleIDError(error);
		} else {
			handleAPIError(error);
		}
	}
}
