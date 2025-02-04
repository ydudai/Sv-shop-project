import { SvUser } from "../models/model.js"

export const createUser = async (usr) => {
    console.log("Controller/user.js - Create User ");
    await SvUser.create(usr);
}