import { model, Schema } from "mongoose";
const UserSchema = new Schema({
    userName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:Object,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    gender:{
        type:String,
        enum:['Male','Female']
    },
    isDeleted:{
        type:Boolean,
        default:false,

    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','NotActive'],
    },
    role:{
        type:String,
        default:'User',
        enum:['User','Admin','SuperAdmin']

    },
    sendcode:{
        type:String,
        default:null,
    }

},{
    timestamps:true,
});
const UserModel = model('User',UserSchema);
export default UserModel;