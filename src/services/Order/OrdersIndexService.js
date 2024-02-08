class OrdersIndexService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute({ title }) {
        const orders = await this.orderRepository.showAllByTitle({ title });

        let separateOrders = [
            { category: "Refeições Principais", orders: [] },
            { category: "Aperitivos", orders: [] },
            { category: "Sobremesas", orders: [] },
            { category: "Bebidas", orders: [] },
            { category: "Café da Manhã", orders: [] },
            { category: "Fast Food", orders: [] },
            { category: "Saladas", orders: [] },
        ];

        orders.map(order => {
            separateOrders.find(item => item.category === order.category).orders.push(order);
        });

        separateOrders = separateOrders.filter(item => item.orders.length > 0);

        return separateOrders;
    }
}

module.exports = OrdersIndexService;