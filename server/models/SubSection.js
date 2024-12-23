const mongoose = require("mongoose");



const SubSectionSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    timeDuretion:{
        type:String,
    },
    description:{
        type:String,
    },
    videourl:{
        type:String,
    },
    
});

module.exports= mongoose.model("SubSection",SubSectionSchema);