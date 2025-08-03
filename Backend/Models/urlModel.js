const mongoose=require('mongoose');

const urlSchema=mongoose.Schema({
    shortURL:{
        type:String,
        unique:true,
    },
    originalURL:{
        type:String,
    },
    createdAt:{
        type:Date,
    },
    expiredAt:{
        type:Date,
        index:{expires:0},
    },
    clickCount:{
        type:Number,
        default:0,
    },
    createdBy:{
        type:String,
        default:null,
    }
})

const URL=mongoose.model('URL',urlSchema);
module.exports={URL};