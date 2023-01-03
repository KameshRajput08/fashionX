import Order from "../models/Order.js";

//PLACE ORDER
export const placeOrder = async (req, res) => {
  req.body.products.map((p) => (p.status = "pending"));
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//UPDATE ORDER
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//CANCEL ORDER
export const deleteOrder = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Order successfully Cancelled" });
    } catch (err) {
      res.status(400).json(err.message);
    }
  } else {
    res.status(405).json({ message: "You are not allowed to cancel order." });
  }
};

//  GET ORDER
export const getOrder = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.id });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//  GET ALL USERS CART
export const getAllOrders = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const Orders = await Order.find();
      res.status(200).json(Orders);
    } catch (err) {
      res.status(400).json(err.message);
    }
  } else {
    res
      .status(405)
      .json({ message: "You are not allowed to access all users's cart." });
  }
};

//INCOME
export const Income = async (req, res) => {
  if (req.user.isAdmin) {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res
      .status(405)
      .json({ message: "You are not allowed to access income from all users" });
  }
};
