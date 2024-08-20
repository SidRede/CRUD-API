const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name :{
            type :String,
            required : [true,"please enter product name "]
        },
        quantity : {
            type : Number,
            required : true,
            default : 0
        },
        price : {
            type : Number,
            required : true
        },
        image : {
            required : false,
            type:String
        }
    },
    {
        timestamps : true
    }
    
)

const product = mongoose.model('model',productSchema);
module.exports = product;