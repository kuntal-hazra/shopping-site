const UserModel = require("../models/user");

exports.creat_user = async (req, res) => {
  try{
      const {name, age, phoneNumber, address} = req.body;
      
      let newUser = new UserModel({
          name, 
          age, 
          phoneNumber, 
          address,
      });
      newUser = await newUser.save();

      res.json(newUser);
    } catch (error){
        res.status(500).json({error: error.message });
      }
};

exports.users = async (req, res) =>{
  try{
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch(error){
    res.status(500).json({error: error.message });
  }
  
};

exports.singleUser = async (req, res) =>{
  try{
    const userId = req.params.id;

    const singleUser = await UserModel.findById(userId);
     if(!singleUser){
      return res.status(404).json({message:`No such user found with id ${userId}`})
     }
     res.status(200).json(singleUser);
  } catch(error){
    res.status(500).json({error: error.message });
  }
};

exports.deleteUser = async (req, res) =>{
  try{
    const userId = req.params.id;

     await UserModel.findByIdAndRemove(userId);
     
     res.status(200).json({message:`User with id ${userId} is deleted successfully`});
  } catch(error){
    res.status(500).json({error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try{
    const {name, age, phoneNumber, address} = req.body;
    const userId = req.params.id;

    let updtedUser = new UserModel({
      name,
      age,
      phoneNumber,
      address,
      _id : userId,
    });

    updtedUser = await UserModel.findByIdAndUpdate(userId, updtedUser);
    res.status(200).json(updtedUser);
  } catch(error) {
    res.status(500).json({error: error.message });
  }
}