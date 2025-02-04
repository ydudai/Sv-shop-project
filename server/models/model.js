import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});
console.log("Models/model.js -- Create User Model")
export const SvUser = mongoose.model("users", userSchema);

const orderSchema = new mongoose.Schema({
    customer: String,
    email: String,
    products: [{
        productName: String,
        price: Number,
    }]
});
export const SvOrder = mongoose.model("orders", orderSchema);


export const dbName = () => { return mongoose.connection.name }

export const dbObject = () => { return mongoose.connection.db }