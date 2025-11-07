import { calculateDiscount } from "../utils/discountCalculator";

export interface ProductData {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
}

export class Product {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;

	constructor(product: ProductData) {
		this.id = product.id;
		this.title = product.title;
		this.description = product.description;
		this.category = product.category;
		this.discountPercentage = product.discountPercentage;
    }
    
    displayDetails() {
        const info = 'title: ${this.title}
        discription: ${ this.description }
        category:${ this.category }
        price: $${ this.price }
        discount: ${ this.discountPercentage }%';
        console.log(info);
        
    }

    getPriceWithDiscount(): number {
        return this.price - calculateDiscount(this.price, this.discountPercentage)
    }
}
