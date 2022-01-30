const express = require("express")
const app = express()

const mongoose = require("mongoose")

const UserModel = require("./models/Users")
 
const env = require("dotenv")
env.config()
const db_pw = process.env.MONGO_PW 
const db_uname = process.env.MONGO_UNAME 


mongoose.connect(`mongodb+srv://${db_uname}:${db_pw}@clsmern60.rwaa1.mongodb.net/mern60mins?retryWrites=true&w=majority`)

const cors = require("cors")

app.use(express.json()) 
app.use(cors())

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if ( err ) return res.json(err)

        res.json(result)
    })
})

app.post("/createUser", async (req, res) => {
    const param = req.body
    const newUser = new UserModel(param)
    const save_res = await newUser.save() 

    res.json( save_res )
})

app.listen(3001, () => {
    console.log('server is running!');
})

