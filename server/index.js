import { connectDB } from "./config/db.js";
import Express from "express"
import cors from "cors"
import { dbName, dbObject } from "./models/model.js";
import { createUser } from "./controllers/user.js";
import { createOrder } from "./controllers/order.js";

// --- Create express server and listen to clients
const app = Express();
app.use(Express.json());
app.use(cors(
    { origin: "*" })
)
app.listen(3000, () => {
    console.log("Listening on 3000...");
})


// --- Connect to MongoDB 
connectDB();

// --- Find the given user --- 
app.get("/", (req, res) => {
    const data = req.query;
    console.log(data);

    //const db = dbObject();
    console.log("dbname = " + dbName());

    let promiseCount = getNumberOfDocuments(data);

    promiseCount.then((count) => {
        console.log("app.get: nunDocs = " + count);

        // Return user data;
        if (count >= 1) {
            sendUserName(data, res);
        } else {
            res.json([]);
        }
    }
    ).catch((err) => {
        console.log(err);
    })
})

// --- Get all products from database --- 
app.get("/products", (req, res) => {

    let promiseAllProducts = getAllProducts();

    promiseAllProducts.then((result) => {
        console.log("app.get: result = " + JSON.stringify(result, null, 2));
        res.json(result);
    }
    ).catch((err) => {
        console.log(err);
        res.send(err);
    })
})


async function getNumberOfDocuments(data) {
    const db = dbObject();
    const numPromise = await db.collection('users').countDocuments({ email: data.email });
    console.log("getNumberOfDocuments: nunDocs = " + numPromise);
    return numPromise;
}


async function sendUserName(data, res) {
    try {
        let result = await getUserNameViaEmail(data);
        console.log("getUserName: result = " + JSON.stringify(result, null, 2));
        res.json(result);
    } catch (err) {
        console.log(err);
    }
}


async function getUserNameViaEmail(data) {
    const db = dbObject();
    try {
        const result = await db.collection('users').find({ email: data.email }).toArray();
        return result;
    } catch (err) {
        console.log("getUsegetUserNameViaEmail error:", err);
        throw err;
    }
}


async function getAllProducts() {
    const db = dbObject();
    try {
        const result = await db.collection('products').find({}).toArray();
        return result;
    } catch (err) {
        console.log("getAllProducts error:", err);
        throw err;
    }
}


// CREATE a new user 
app.post("/signup", async (req, res) => {
    const data = req.body;
    console.log(data);

    // This is en example of data
    // 
    // const user = {
    //     name: "Y D",
    //     email: "yonatan@gmail.com",
    //     password: "12345",
    // }
    await createUser(data);
    sendUserName(data, res);
    //res.send("OK");
})


// CREATE a new order 
app.post("/order", (req, res) => {
    const data = req.body;
    console.log(data);

    // This is en example of one Order data
    //    {
    //     customer: 'Yossi Dudai',
    //     email: 'ydudai@outlook.com',
    //     products: [
    //       { productName: 'milk', price: 23 },
    //       { productName: 'gum', price: 3 }
    //     ]
    //   }   
    createOrder(data);
    res.send("OK");
})

// Server-side logout handler
app.get('/logout', async (req, res) => {
    //try {
    // 1. Get session ID or user info from request
    //const sessionId = req.session.id;
    //const userId = req.session.userId;

    // 2. Clear session from database (if using MongoDB)
    //await req.session.deleteOne({ _id: sessionId });

    // 4. Clear session cookies
    // req.session.destroy((err) => {
    //     if (err) {
    //         console.error('Session destruction error:', err);
    //         return res.status(500).json({ error: 'Logout failed' });
    //     }

    //     // 5. Clear cookies
    //     res.clearCookie('sessionId');
    //     res.clearCookie('jwt'); // if using JWT
    //     res.clearCookie('connect.sid'); // Express session cookie

    //     res.status(200).json({ message: 'Logged out successfully' });
    // });

    //} catch (error) {
    //    console.error('Logout error:', error);
    //    res.status(500).json({ error: 'Logout failed' });
    //}
});


// --- Get all orders from database --- 
app.get("/all", async (req, res) => {
    const data = req.query;
    console.log(data.admin);
    
    if (data.admin == 'true') {
        try {
            let allOrders = await getAllOrders();
            console.log("app.get/all: allOrders = " + JSON.stringify(allOrders, null, 2));
            res.json(allOrders);
        } catch (err) {
            console.log(err);
            res.send(err);
        }

    } else {
        res.send("No admin user");
    }
})


async function getAllOrders() {
    const db = dbObject();
    try {
        const result = await db.collection('orders').find({}).toArray();
        return result;
    } catch (err) {
        console.log("getAllOrders error:", err);
        throw err;
    }
}
