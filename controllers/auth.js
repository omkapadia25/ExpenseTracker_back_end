const User=require('../models/User')


const register = async (req,res)=>{
    try{
        const user=await User.create({...req.body});
        const token=user.createJWT()
        res.status(201).json({
         user:{
             name:user.name
         },token
        })
    }catch(err){
            res.status(409).send(err);
    }
}
const login=async(req,res)=>{

    try{
        console.log("hello")
        const {email,password}=req.body
    
        if(!email || !password){
            throw "Please Provide email and Password"
        }
        const user=await User.findOne({email})
        if(!user){
            throw "User not found"
        }
        const isPasswordCorrect=await user.comparePassword(password)
        if(!isPasswordCorrect){
            throw "Invalid Credentials"
        }
        const token = user.createJWT()
        res.cookie("token", token,{
            expires:new Date(Date.now() + 60000000),
            httpOnly: false
        });
        // console.log(token)

        res.status(201).json({ user: { name: user.name }, token })

    }catch(err){
        res.status(400).send(err)
    }

}

module.exports={
    register,login
}