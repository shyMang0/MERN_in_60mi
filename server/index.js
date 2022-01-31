const express = require("express")
const app = express()

const mongoose = require("mongoose")

const UserModel = require("./models/Users")
 
const env = require("dotenv")
env.config()
const db_pw = process.env.MONGO_PW 
const db_uname = process.env.MONGO_UNAME  

const port = 3001

mongoose.connect(`mongodb+srv://${db_uname}:${db_pw}@clsmern60.rwaa1.mongodb.net/mern60mins?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on("error", err => {
    console.log("connection error--------", err)
    process.exit(0) //--close server on error
})

mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected------------")
})

const cors = require("cors")

app.use(express.json()) 
app.use(cors())

app.get("/getUsers", (req, res) => {
    // try {
        // UserModel.find({username: "dyxx"}, (err, result) => {

        findstr = "a"

        UserModel.find({ name: { $regex: findstr, $options: 'i' } })   
            // .select('fullname name')
            // .populate('fullname')
            .exec( (err, result) => {
                if ( err )  return res.status(502).json(err) 
                return res.json(result)
            })
    //     const found = await UserModel.find({})

    // } catch (error) {
    //     console.log('try catch errrr', error);
    //     res.json(error)
    // }
})

app.post("/createUser", async (req, res) => {
    const param = req.body
    const newUser = new UserModel(param)

    const save_res = await newUser.save() 

    res.json( save_res )
})

app.listen(port, () => {
    console.log(`server is running! ${port}`);
})

