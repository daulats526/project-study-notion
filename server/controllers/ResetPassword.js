const generate = require("otp-generator");
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt");
const crypto = require("crypto")

// reset password
exports.resetPasswordToken = async (req, res)=>{
try {
    
    //get email from body
    const email = req.body.email;
    
    const user = await User.findOne({email:email});
    if(!user){
        return res.json({success:false,
            message:'your email is not registered with us'
        });
      
    }
      // generat tooken
      const token = crypto.randomUUID();
    //   update user by adding token and expire time
    const updateDetails = await User.findOneAndUpdate({
        email:email
    },{
        token:token,
        resetPasswordExpires:Date.now() + 5*60*1000,
    },
    {
        new:true
    });
    
    
    
    
    
        const url = `http://localhost:4400/update-password/${token}`
        // send mail 
        await mailSender(email,
            "password Reset Link",
            `Password Reset Link: ${url}`
        );
        return res.json({
            success:true,
            message:'email sent successfully , please check email '
        })
} catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:'Somethin went wrong while reset password sendig password mail'
    })
    
}
}
exports.resetPassword = async (req, res) =>{
   try {
     // data fetch
     const { password, confirmPassword, token} = req.body;
     //validation
     if(password !== confirmPassword){
         return res.json({
             success:false,
             message:'password is not match',
         });
     }
     // fatch user details from db
     const userDetails = await User.findOne({token: token});
     if(!userDetails){
         return res.json({
             success:false,
             message:'token is invalid',
         });
     }
     //token time check
     if(userDetails.resetPasswordExpires < Date.now()){
         return res.json({
             success:false,
             message:'token is expires , please try again '
         })
     }
     //hash password
     const hashedPassword = await bcrypt.hash(password, 10);
     //password update
     await User.findOneAndUpdate(
         {token:token},
         {password:hashedPassword},
         {new:true},
     );
     return res.status(200).json({
         success:true,
         message:'pass reset successsful',
     })
 
   } catch (error) {
       console.log(error)  
   }
}