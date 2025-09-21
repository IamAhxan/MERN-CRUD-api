const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("../models/Users");

const app = express();

// ✅ Allow frontend to access
app.use(
    cors({
        origin: "https://mern-crud-frontend-rose.vercel.app", // your frontend on vercel
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());

// ✅ MongoDB connection (only once)
let isConnected = false;
async function connectDB() {
    if (isConnected) return;
    try {
        await mongoose.connect(
            "mongodb+srv://<username>:<password>@cluster0.uydw7eo.mongodb.net/EXAMPLEDATABASE?retryWrites=true&w=majority&appName=Cluster0",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        isConnected = true;
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

// ✅ Middleware to ensure DB is connected
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// ✅ Routes
app.get("/", (req, res) => {
    UserModel.find({})
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/getUser/:id", (req, res) => {
    UserModel.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/updateUser/:id", (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete("/deleteUser/:id", (req, res) => {
    UserModel.findByIdAndDelete(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// ✅ Important: export app (no app.listen on Vercel)
module.exports = app;
