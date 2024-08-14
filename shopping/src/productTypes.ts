export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    category: string;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
}