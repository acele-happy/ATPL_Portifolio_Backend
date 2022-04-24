import User from "../models/User.js";
import bcrypt from "bcrypt";
const { compare } = bcrypt;
import lodash from 'lodash'
const {pick} = lodash


export const signup = async(req,res)=>{
    try{
        let user= new User(
            pick(req.body,[
            "Name",
            "Email",
            "Password"
        ])
        )

        await user.save()
        return res.status(201).send({
            message:
              "Registered successfully.",
              user
          });
    }catch(e){
        res.status(400).send("Error!!!")
    }
}

export const loginAsAdmin = async (req, res) => {
  try {
    let user = User.findOne({ Email: req.body.Email });
    if (!user) {
      res.status(400).send("Invalid email or password!!");
    }
    let email = req.body.Email;
    if (email != "acele4444@gmail.com") {
      res.status(400).send("Invalid email or password!!");
    }
    let validPassword = compare(req.body.Password, user.Password);
    if (!validPassword) {
      res.status(400).send("Invalid email or password!!");
    }
  } catch (e) {
    res.status(500).send("Error!!");
  }
};

export const loginAsUser = async (req, res) => {
  try {
    let user = User.findOne({ Email: req.body.Email });
    if (!user) {
      res.status(400).send("Invalid email or password!!");
    }

    let validPassword = compare(req.body.Password, user.Password);
    if (!validPassword) {
      res.status(400).send("Invalid email or password!!");
    }

    const token = user.generateAuthToken();
    res.header("Authorization", token).send({
      status: 200,
      message: "Login Successful",
      data: user,
    });
  } catch (e) {
    res.status(400).send("Error!!");
  }
};

export const getAllUsers = async(req,res)=>{
  try{
    let users= await User.find({})
    return res.status(200).send(users)
  }catch(ex){
    res.status(400).send("Error!!")
  }
}

export const getUserById = async(req,res)=>{
  try{
    console.log("req.params.id")
    const user = await User.findById(req.params.id)
    return res.status(200).send(user)
  }catch(ex){
    res.status(400).send("Error!!")
  }
}