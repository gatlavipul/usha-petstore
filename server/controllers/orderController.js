import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart || !cart.items.length) {
      return res.status(400).json({ message: "Cart is empty." });
    }
    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const order = await Order.create({
      user: req.user.id,
      items: cart.items,
      totalAmount,
      address: req.body.address
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to create order." });
  }
};

// Get logged-in user's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders." });
  }
};

// Admin: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "email")
      .populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all orders." });
  }
};
