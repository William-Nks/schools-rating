const mongoose = require('mongoose')
const Schema = mongoose.Schema


const schoolSchema = new Schema({
    school: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    reviews: {
        type: [
            {
                id: String,
                name: {
                    type: String, 
                    required: true
                },
                comment: {
                    type: String, 
                    required: true, 
                    minlength: 1, 
                    maxlength: 250
                },
                rate: {
                    type: Number, 
                    required: true, 
                    min: 1, 
                    max: 5
                }
            }
        ]
    }
}, {timestamps: true});

const School = mongoose.model('School', schoolSchema)
module.exports = School