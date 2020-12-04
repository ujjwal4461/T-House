const mongoose = require('mongoose');
const uuid = require('uuid/v1');
const crypto = require('crypto')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 20
    },
    email : {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo : {
        type: String,
        trim: true
    },
    encypted_password : {
        type: String,
        required: true
    },
    role : {
        type: Number,
        default: 0
    },
    salt: {
        type: String
    },
    purchase : {
        type: Array,
        default: []
    }
}, {timestamps: true})

userSchema.virtual('password')
    .set(function(password){
        this._password = password,
        this.salt = uuid();
        this.encypted_password = this.hashPassword(password)
    })
    .get(function(){
        return this._password
    })


userSchema.methods = {
    hashPassword: function(plainpassword){
        if (!plainpassword) return "";
        try {
            return crypto
              .createHmac("sha256", this.salt)
              .update(plainpassword)
              .digest("hex");
        } catch (err) {
            console.log('error in hashing');
            return "";
        }
    },

    comparePassword: function(password){
        return this.encypted_password === this.hashPassword(password)
    }
}

module.exports = mongoose.model('User',userSchema)