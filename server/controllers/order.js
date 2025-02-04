import {SvOrder } from "../models/model.js"

export const createOrder = (order) => {
    console.log("Controller/order.js - Create Order ");
    SvOrder.create(order);
}