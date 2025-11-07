export function calculateDiscount(price: number, discount: number): number {
	return Number(((price * discount) / 100).toFixed(2));
}
