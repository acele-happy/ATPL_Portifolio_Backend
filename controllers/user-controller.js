const User =require( "../models/User.js");
const bcrypt =require( "bcrypt");
const { compare } = bcrypt;
const lodash =require( 'lodash')
const {pick} = lodash


module.exports.signup = async(req,res)=>{
    try{

      let user = await User.findOne({Email: req.body.Email})

      if(user){
        return res.send("Email already exist")
      }

        let newuser= new User(
            pick(req.body,[
            "Name",
            "Email",
            "Password"
        ])
        )
        
        await newuser.save()
        return res.render('/signup',{message: "Registered successfully"})
        // return res.status(201).send({
        //     message:
        //       "Registered successfully.",
        //     user: newuser
        //   });
    }catch(e){
        // return res.render('/signup',{message: "Error!!!"})
        return res.status(400).send("Error!!!")
    }
}

module.exports.loginAsAdmin = async (req, res) => {
  try{
    let user = await User.findOne({ Email: req.body.Email });
   
    if (!user){
     return res.status(400).send("Invalid email or Password !!");
    }
    let email = req.body.Email;
    if (email != "acele@gmail.com"){
     return res.status(400).send("Invalid email or Password !!");
    }
  
    let validPassword= false
    if(req.body.Password === user.Password){
      validPassword=true
    }
 
    if(!validPassword) {
      return res.status(400).send("Invalid email or Password !!");
    }

    const token = user.generateAuthToken()
    return res.header("Authorization",token).send({
      message:"Welcome to admin dashboard",
      token:token
    })
    // res.redirect('dashboard.html')
  }catch(e){
   return res.status(500).send("Error!!"+e);
  }
};


module.exports.loginAsUser = async(req,res) => {
  try{
    let user = await User.findOne({Email: req.body.Email});
    if(!user){
      res.status(400).send("Invalid email");
    }

    let validPassword= compare(req.body.Password, user.Password)

    if(!validPassword) {
      res.status(400).send("invalid password!!");
    }

    const token = user.generateAuthToken();
    return res.header("Authorization", token).send({
      status: 200,
      message: "Login Successful",
      data: user,
      token: token
    });
  }catch (e) {
    res.status(400).send("Error!!");
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