const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type: String, required : true},
    age : {type: Number, required : true},
    phoneNumber : {type: Number, required :true},
    address : {type: String,required :true},
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;