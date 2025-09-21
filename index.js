const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')



const app = express()
const port = process.env.PORT || 3001;

const mongoUrl = "mongodb+srv://mohammadahsan7744:2bUOKwM3L3MbY69G@cluster0.uydw7eo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

app.use(cors({
    orogin: ["https://mern-crud-frontend-rose.vercel.app/"],
    methods: ['GET', "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())

mongoose.connect(mongoUrl)

// let isConnected = false;
// async function connectToMongoDB() {
//     try {
//         await mongoose.connect(mongoUrl, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         isCOnnected = true;
//         console.log("Connected to Mongo DB");
//     } catch (error) {
//         console.log("mongoDB error: ", error)
//     }
// }
// app.use((req, res, next) => {
//     if (!isConnected) {
//         connectToMongoDB()
//     }
//     next()
// })

app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => {
            res.send("server is running")
            res.json(users)
        })
        .catch(err => console.log(err))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => console.log(err))
})

app.put("/updateUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, email: req.body.email, age: req.body.age })
        .then(users => res.json(users))
        .catch(err => console.log(err))
})
app.delete("/deleteUser/:id", (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => console.log(err)
        )
})

app.post("/createUser", (req, res) => {
    console.log(req.body)
    UserModel.create(req.body).then(users => res.json(users)).catch(err => res.json(err))
})

app.listen(port, () => {
    console.log("server in running")
})

// module.exports = app