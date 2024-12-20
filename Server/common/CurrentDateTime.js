class CurrentDateTime {
    async getCurrentDateTime() {
        const now = new Date();
        return now.toISOString().slice(0, 19).replace('T', ' '); // YYYY-MM-DD HH:mm:ss
    }

    // (orderDate + 3 ngày)
    async getDeliveryDate(orderDate) {
        const date = new Date(orderDate);
        date.setDate(date.getDate() + 3);
        return date.toISOString().slice(0, 19).replace('T', ' '); // YYYY-MM-DD HH:mm:ss
    }
}
module.exports = new CurrentDateTime();