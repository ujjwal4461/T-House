const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 25
    }
},{ timestamps: true})

module.exports = mongoose.model('Category',categorySchema)