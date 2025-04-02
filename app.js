const express = require("express")
const app = express()
const connectDB = require("./configs/database")

const userModels = require('./models/userModel')

//Khai bao router
const userRoutes = require("./router/userRouter")
const animeRouter = require("./router/animeRouter")
const animeGenerRouter = require("./router/animeGenerRouter")
const generRouter = require("./router/generRouter")


app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectDB();

app.use('/', userRoutes);
app.use('/', animeRouter);
app.use('/', animeGenerRouter);
app.use('/', generRouter);

app.listen(8000, () => {
    console.log("Server run at port 8000");
})