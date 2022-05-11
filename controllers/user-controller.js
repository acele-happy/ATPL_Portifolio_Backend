const User =require( "../models/User.js");
const bcrypt =require( "bcrypt");
const { compare } = bcrypt;
const lodash =require( 'lodash')
const {pick} = lodash
const express = require('express')


module.exports.signup = async(req,res)=>{
  try{

    let user = await User.findOne({Email: req.body.Email})

    if(user){
      return res.render('signup.ejs',{message: "Email already exist", style:"error-div"})
    }

      let newuser= new User(
          pick(req.body,[
          "Name",
          "Email",
          "Password"
      ])
      )
      
      await newuser.save()
      return res.render('signup.ejs',{message: "Registered successfully",style:"success"})
  }catch(e){
      return res.render('signup.ejs',{message: "Error!!!",style:"error-div"})
  }
}

module.exports.loginAsAdmin = async (req, res) => {
  try{
    let user = await User.findOne({ Email: req.body.Email });
   
    if (!user){
     return res.render('login.ejs',{message:"Invalid email or Password !!",style:"error-div"});
    }
    let email = req.body.Email;
    if (email != "acele@gmail.com"){
     return res.render('login.ejs',{message:"Invalid email or Password !!",style:"error-div"});
    }
  
    let validPassword= false
    if(req.body.Password === user.Password){
      validPassword=true
    }

    
    if(!validPassword) {
      return res.render('login.ejs',{message:"Invalid email or Password !!",style:"error-div"});
    }
    const token = user.generateAuthToken()
    // console.log(token)
    // localStorage.setItem('token',token)
    return res.render('login.ejs',{message:"Logged in!!",style:"success",token:token})
    // const token = user.generateAuthToken()
    // return res.header("Authorization",token).send({
    //   message:"Welcome to admin dashboard",
    //   token:token
    // })
    // res.redirect('dashboard.html')
  }catch(e){
    return res.send(e)
  //  return res.render('login.ejs',{message:"Error!!"+e+"",style:"error-div"});
  }
};


module.exports.loginAsUser = async(req,res) => {
  try{
    let user = await User.findOne({Email: req.body.Email});
    if(!user){
     return res.render('loginAsUser.ejs',{message:"Invalid Email or Password!",style:"error-div"});
    }

    let validPassword= await compare(req.body.Password, user.Password)
    if(!validPassword) {
     return res.render('loginAsUser.ejs',{message:"Invalid Email or Password!",style:"error-div"});
    }

     const token = user.generateAuthToken();
     localStorage.setItem('token',token)
    return res.render('loginAsUser.ejs',{message:"Logged in!!",style:"success"})

    // const token = user.generateAuthToken();
    // return res.header("Authorization", token).send({
    //   status: 200,
    //   message: "Login Successful",
    //   data: user,
    //   token: token
    // });
  }catch (e) {
    res.render('loginAsUser',{message: 'Error!!',style:"error-div"});
  }
};

module.exports.getAllUsers = async(req,res)=>{
  try{
    let users= await User.find({})
    return res.status(200).send(users)
  }catch(ex){
    res.status(400).send("Error!!")
  }
}

module.exports.getUserById = async(req,res)=>{
  try{
    const user = await User.findById(req.params.id)
    return res.status(200).send(user)
  }catch(ex){
    res.status(400).send("Error!!")
  }
}

module.exports.deleteUser = async(req,res)=>{
  try{
    let user = await User.findByIdAndDelete(req.params.id)
    return res.status(200).send({
      message: "deleted!!",
      data: user
  })
  }catch(e){
   return res.status(400).send("Error!!")
  }
}