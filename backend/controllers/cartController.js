// import Cart from "../models/Cart.js";
// import Product from "../models/Product.js"; // We'll need this to populate

// // Add item to cart
// export const addToCart = async (req, res) => {
//   const { userId, productId, quantity } = req.body;

//   try {
//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     const existingItem = cart.items.find(
//       (item) => item.productId.toString() === productId
//     );

//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       cart.items.push({ productId, quantity });
//     }

//     await cart.save();

//     const populatedCart = await cart.populate('items.productId');
//     res.json(populatedCart);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //  Get user cart
// export const getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
//     res.json(cart || { items: [] });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //  Remove item from cart
// export const removeFromCart = async (req, res) => {
//   try {
//     const { userId, productId } = req.body;
//     const cart = await Cart.findOne({ userId });

//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
//     await cart.save();

//     const populatedCart = await cart.populate('items.productId');
//     res.json(populatedCart);


//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import Cart from "../models/Cart.js";

// 🟢 Add item to cart
export const addToCart = async (req, res, next) => {
  // We get userId from the 'protect' middleware
  const { productId, quantity } = req.body;
  const userId = req.user.id; 

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
    
    // Send back the fully populated cart to prevent refresh bug
    const populatedCart = await Cart.findById(cart._id).populate("items.productId");
    res.json(populatedCart);
  } catch (error) {
    next(error); // Pass error to global handler
  }
};

// 🔵 Get user cart
export const getCart = async (req, res, next) => {
  // We get userId from the URL param, but check it against the logged-in user
  if (req.user.id !== req.params.userId) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
    res.json(cart || { items: [] });
  } catch (error) {
    next(error); // Pass error to global handler
  }
};

// 🔴 Remove item from cart
export const removeFromCart = async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();

    // Send back the fully populated cart
    const populatedCart = await Cart.findById(cart._id).populate("items.productId");
    res.json(populatedCart);
  } catch (error) {
    next(error); // Pass error to global handler
  }
};

// 🟠 NEW: Update item quantity
export const updateQuantity = async (req, res, next) => {
  const { productId, newQuantity } = req.body;
  const userId = req.user.id;

  // Validate quantity
  if (newQuantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1." });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const itemToUpdate = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!itemToUpdate) {
      return res.status(404).json({ message: "Item not found in cart." });
    }

    // You could add a check against product.stock here in the future
    itemToUpdate.quantity = newQuantity;

    await cart.save();
    
    // Send back the fully populated cart
    const populatedCart = await Cart.findById(cart._id).populate("items.productId");
    res.json(populatedCart);

  } catch (error) {
    next(error); // Pass error to global handler
  }
};


