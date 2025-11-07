import { calculateDiscount } from "./discountCalculator";
import { Product } from "../models/Product";

export function calculateTax(product: Product): number {
	const priceAfterDiscount =
		product.price -
		calculateDiscount(product.price, product.discountPercentage);
	const tax: number = 4.75;
	if (product.category === "groceries") {
		return Number(((priceAfterDiscount * 3) / 100).toFixed(2));
	} else {
		return Number(((priceAfterDiscount * tax) / 100).toFixed(2));
	}
}
