const Order = require("../models/orderModel");

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        const order = new Order({
            user: req.user.id, // Later, we'll set up user authentication
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });  //Internal server error
    }
};

module.exports = { createOrder };
