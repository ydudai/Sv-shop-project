import mongoose from "mongoose"

mongoose.connection.close();

export const connectDB = () => {
    mongoose.connection.close();
    mongoose.connect("mongodb+srv://ydudai:2tkIaFCiFXPsQYrF@cluster0.gfuz4.mongodb.net/svshop").then(() => {
        console.log("Mongodb is connected db: svshop ...")
        
    })
    .catch(error => {
        console.log(error)
    })
}

