export interface Order {
    paymentMethod: string;
    userId: number,
    orderDate: Date,
    deliveryDate: Date,
    status: boolean,
    address: string
}