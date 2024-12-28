export interface Order {
    paymentMethod: string;
    userId: number,
    orderDate: Date,
    deliveryDate: Date,
    status: number,
    address: string
}