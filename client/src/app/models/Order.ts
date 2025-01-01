export interface Order {
    orderId: number;
    name: string;
    order_quantity: number;
    totalBill: number;
    paymentMethod: string;
    userId: number;
    orderDate: Date;
    deliveryDate: Date;
    status: number;
    address: string;
}