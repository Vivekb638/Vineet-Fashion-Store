import Cart from "../models/Cart.js";
import Product from "../models/Product.js"; // We'll need this to populate

// 🟢 Add item to cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    // --- THIS IS THE FIX ---
    // We populate the 'items.productId' path before sending it back.
    const populatedCart = await cart.populate('items.productId');
    res.json(populatedCart);
    // --- END OF FIX ---

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔵 Get user cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔴 Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();

    // --- THIS IS THE FIX ---
    // We also populate here so removing an item updates the cart instantly.
    const populatedCart = await cart.populate('items.productId');
    res.json(populatedCart);
    // --- END OF FIX ---

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
