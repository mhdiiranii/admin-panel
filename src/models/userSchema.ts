import  { model, models, Schema } from "mongoose";


const userSchema = new Schema (
    {
        id : {type: String, require : false},
        username : {type:String , require : true},
        email : {type:String , require : true , unique:true},
        password : {type:String , require : false},
        role : {type:String , require : true},
    },
    { timestamps: true }
);

const User =models.User ||  model('User',userSchema);

export default User ;
