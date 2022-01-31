const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        required : true,
    },
    username : {
        type : String,
        required : true,
    }
})


// SAMPLE VIRTUALS
UserSchema
    .virtual('fullname')
    .get(function () {
        const fullname = this.name + ' @ ' + this.username
        return fullname
    })

//In the Docs : Does not include Virtual fields by default
UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel