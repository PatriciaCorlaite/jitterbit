const Order = require('../models/Order');
const { success, error } = require('../utils/apiResponse');

function mapRequestToOrder(body) {
    if (!body) return null;

    return {
        orderId: body.numeroPedido,
        value: body.valorTotal,
        creationDate: body.dataCriacao ? new Date(body.dataCriacao) : new Date(),
        items: Array.isArray(body.items) ? body.items.map(i => ({
            productId: i.idItem,
            quantity: i.quantidadeItem,
            price: i.valorItem
        })) : []
    };
}

exports.createOrder = async (req, res) => {
    try {
        const mapped = mapRequestToOrder(req.body);

        if (!mapped || !mapped.orderId)
            return error(res, 'Campo numeroPedido é obrigatório.', 400);

        const exists = await Order.findOne({ orderId: mapped.orderId });
        if (exists) return error(res, `Pedido ${mapped.orderId} já existe.`, 409);

        const order = new Order(mapped);
        await order.save();

        return success(res, order, 201);
    } catch (err) {
        return error(res, err.message, 500);
    }
};

exports.getOrderByNumber = async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.numeroPedido });
        if (!order) return error(res, 'Pedido não encontrado.', 404);
        return success(res, order);
    } catch {
        return error(res, 'Erro ao buscar pedido.');
    }
};

exports.listOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        return success(res, orders);
    } catch {
        return error(res, 'Erro ao listar pedidos.');
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const mapped = mapRequestToOrder(req.body);
        if (!mapped) return error(res, 'Payload inválido.', 400);

        const order = await Order.findOne({ orderId: req.params.numeroPedido });
        if (!order) return error(res, 'Pedido não encontrado.', 404);

        order.value = mapped.value ?? order.value;
        order.creationDate = mapped.creationDate ?? order.creationDate;

        if (mapped.items?.length > 0) order.items = mapped.items;

        await order.save();

        return success(res, order);
    } catch {
        return error(res, 'Erro ao atualizar pedido.');
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const result = await Order.findOneAndDelete({ orderId: req.params.numeroPedido });
        if (!result) return error(res, 'Pedido não encontrado.', 404);
        return success(res, { message: 'Pedido removido.' });
    } catch {
        return error(res, 'Erro ao deletar pedido.');
    }
};