const mongoose=require('mongoose');



const DashboardSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            default:"Anonymous"
        },
        categories:{
                type:String,
                default:"Investment"
        },
        amount:{
            type:String
        },
        date:{
            type:Date,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
          }
    }
);

module.exports=mongoose.model('Dashboard',DashboardSchema)