import mongoose from "mongoose"

mongoose.connection.close();

export const connectDB = () => {
    mongoose.connection.close();
    mongoose.connect("mongodb+srv://<mongo-username>:<mongo-password>@cluster0.gfuz4.mongodb.net/<db-name>).then(() => {
        //console.log("Mongodb is connected db: svshop ...");
    })
    .catch(error => {
        console.log(error)
    })
}

