// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Please enter product name"],
//     },
//     description: {
//       type: String,
//       required: [true, "Please enter product description"],
//     },
//     price: {
//       type: Number,
//       required: [true, "Please enter product price"],
//     },
//     category: {
//       type: String,
//       required: [true, "Please specify category (e.g. Men, Women, Shoes)"],
//     },
//     image: {
//       type: String,
//       default: "https://via.placeholder.com/150",
//     },
//     stock: {
//       type: Number,
//       default: 10,
//     },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);
// export default Product;


import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
    },
    category: {
      type: String,
      required: [true, "Please specify category (e.g. Men, Women, Shoes)"],
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    stock: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true }
);

// Note: Your file was named User.js, but the schema is clearly for a Product.
// I am assuming the file name is Product.js and the model name is Product.
const Product = mongoose.model("Product", productSchema);
export default Product;
