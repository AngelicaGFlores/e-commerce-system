import { Product } from "./models/Product";
import type { ProductData } from "./models/Product";
import { calculateTax } from "./utils/taxCalculator";
import { calculateDiscount } from "./utils/discountCalculator";
import {
	fetchProducts,
	fetchProduct,
	fetchProductsSorted,
	fetchProductsByCategory,
	addProduct,
	updateProduct,
	deleteProduct,
} from "./services/apiService";
import {
	handleIDError,
	handleAPIError,
	IDError,
	APIError,
} from "./utils/errorHandler";

function displayProdcutsDetails(productsObject: any[]) {
	for (let productObject of productsObject) {
		const product = new Product(productObject);
		product.displayDetails();
		console.log(
			`tax (${product.title}) after discount: $` + calculateTax(product)
		);
		console.log(
			`discount: $${calculateDiscount(
				product.price,
				product.discountPercentage
			)}`
		);
	}
}

function displayProductDetails(productObject: ProductData) {
	const product = new Product(productObject);
	product.displayDetails();
	console.log(
		`tax (${product.title}) after discount: $` + calculateTax(product)
	);
	console.log(
		`discount: $${calculateDiscount(product.price, product.discountPercentage)}`
	);
}

try {
	console.log("DISPLAY ALL THE PRODUCTS!");
	console.log("_______________________________________________");
	const productsObject = await fetchProducts();
	displayProdcutsDetails(productsObject);
} catch (error) {
	handleAPIError(error);
}

try {
	console.log("DISPLAY THE PRODUCT WITH ID 2!");
	console.log("_______________________________________________");
	const id = 2;
	const product1Object = await fetchProduct(id);
	if (!product1Object) {
		throw new IDError("", id);
	}
	const product1 = new Product(product1Object);
	product1.displayDetails();
	console.log(`tax (${product1.title}): ` + calculateTax(product1));
} catch (error) {
	handleIDError(error);
}

try {
	console.log("DISPLAY ALL THE PRODUCTS SORTED BY PRICE IN DESCENDING ORDER!");
	console.log("_______________________________________________");
	const products = await fetchProductsSorted("price", "desc");
	if (products === undefined) {
		throw new Error("The fetch was unsuccessful");
	}
	displayProdcutsDetails(products);
} catch (error) {
	console.error(error);
}

try {
	console.log(
		"DISPLAY ALL THE PRODUCTS THAT MATCH THE CATEGORY OF SMARTPHONES!"
	);
	console.log("_______________________________________________");
	const products = await fetchProductsByCategory("smartphones");
	if (products === undefined) {
		throw new Error("The fetch was unsuccessful");
	}
	displayProdcutsDetails(products);
} catch (error) {
	console.error(error);
}

try {
	console.log("ADD A NEW PRODUCT!");
	console.log("_______________________________________________");
	const body = {
		title: "Intel Core i9-14900K",
		category: "Electronics",
		price: 589.99,
		description:
			"14th Gen Intel Core i9-14900K desktop processor with 24 cores (8 Performance-cores, 16 Efficient-cores) and up to 6.0 GHz turbo frequency for extreme gaming and multitasking performance.",
		stock: 42,
		discountPercentage: 25,
	};
	const product = await addProduct(JSON.stringify(body));
	if (product === undefined) {
		throw new APIError("Failed to add the product to the database!");
	}
	displayProductDetails(product);
} catch (error) {
	handleAPIError(error);
}

try {
	console.log("UPDATED THE INFORMATION OF A PRODUCT!");
	console.log("_______________________________________________");
	const id = 1;
	const product1Object = await fetchProduct(id);
	if (!product1Object) {
		throw new IDError("", id);
	}
	displayProductDetails(product1Object);
	console.log("UPDATED PRODUCT BELLOW _______________________");
	const body = {
		title: "Essence Lash Princess Waterproof Mascara",
		price: 12,
	};
	const updatedProduct = await updateProduct(1, JSON.stringify(body));
	if (updatedProduct === undefined) {
		throw new APIError("Failed to add the product to the database!");
	}
	displayProductDetails(updatedProduct);
} catch (error) {
	if (error instanceof IDError) {
		handleIDError(error);
	} else {
		handleAPIError(error);
	}
}

try {
	console.log("DELETED THE PRODUCT WITH ID 1!");
	console.log("_______________________________________________");
	const id = 1;
	const deletedProduct = await deleteProduct(id);
	if (deletedProduct === undefined) {
		throw new APIError("Failed to delete the product!");
	}
	if (deletedProduct.isDeleted) {
		console.log("The following product was successfully deleted!");
		displayProductDetails(deletedProduct);
	}
} catch (error) {
	handleAPIError(error);
}
