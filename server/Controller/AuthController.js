import bcrypt from 'bcryptjs'
import UserModel from '../models/UserModel.js';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'
import transporter from '../config/nodemailer.js'

export const Register = async (req , res)=>{
  const { Name, Email, Password, role } = req.body; // 🔁 role destructure kar liya

  if(!Name || !Email || !Password){
    return res.json({
        success : false,
        message : 'missing Details'
    });
  }

  try {
    const existingUser = await UserModel.findOne({ Email });
    if(existingUser){
        return res.json({
            success: false,
            message: "User Already exists"
        });
    }

    const hashpassword = await bcrypt.hash(Password , 10);

    const User = new UserModel({
        Name,
        Email,
        Password: hashpassword,
        role: role || "user", // 🔁 Default "user" agar koi role na mile
     
    });

    await User.save();

    const token = jwt.sign({ id: User._id }, process.env.SECURTY_KEY , { expiresIn: '7d' });

    res.cookie('token' , token , {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'Production',
        sameSite: process.env.NODE_ENV === 'Production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const mailOptions = {
        from: 'muhammadhassan872519@gmail.com',
        to: Email,
        subject: `Welcome ${Name}`,
        text: `Welcome to our website. Your account has been created with email id: ${Email}`
    };

    transporter.sendMail(mailOptions , (error) => {
        if (error) console.log(error.cause);
    });

    return res.json({
        success: true,
        role: User.role,  // 🔁 role response mein bhej rahe ho
        User,
    });

  } catch(error) {
    return res.json({
        success: false,
        message: error.message
    });
  }
};


export const Login = async (req , res) => {
  const { Email, Password } = req.body;

  if(!Email || !Password){
    return res.json({
      success: false,
      message: "Email and Password are required"
    });
  }

  try {
    const user = await UserModel.findOne({ Email });
    if(!user){
      return res.json({
        success: false,
        message: "Invalid Email"
      });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if(!isMatch){
      return res.json({
        success: false,
        message: "Invalid Password"
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECURTY_KEY, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      role: user.role,  // 🔁 role bhejna zaroori hai for frontend routing
      token: token  // <-- yahan token bhi bhej do
    });

  } catch(error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};

export const GetAllUsers = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.SECURTY_KEY);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const users = await UserModel.find().select("-Password -verifyOtp -verifyOtpExpireAt -restOtp -restOtpExpireAt");

    return res.json({
      success: true,
      users
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};



export const Logout = async(req , res)=>{
try{
    res.clearCookie('token' , {
        httponly : true,
            secure : process.env.NODE_ENV ==='Production',
            sameSite : process.env.NODE_ENV ==='Production' ? 'none' :'strict',
    })
    res.json({success:true , message:"Logged out"})
}catch(error){
    res.json({
        success:false,
        message : error.message
    })
}
}

export const SendVerifyOtp = async(req , res) =>{
    try{
        const {userId} = req.body;
        const user = await UserModel.findById(userId)
        if(user.isAccountVerified){
            return res.json({success:false , message : "your account is already verified"})
        }
     const Otp =   String(Math.floor( 100000 + Math.random() * 100000))

     user.verifyOtp = Otp;
     user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

     await user.save();

     const mailoption = {
        from : 'muhammadhassan872519@gmail.com',
        to: user.Email ,
        subject : `account verification Otp`,
        text : `your Otp is ${Otp} . verify your account using this Otp .`
    }

    await transporter.sendMail(mailoption);
    res.json({
        success:true,
        message : "Verification Otp Sent on Email"
    })

    }
    catch(error){
        res.json({
            success: false,
            message : error.message
        })
    }
}


export const  VerifyEmail = async (req , res)=>{
    const {userId , Otp} = req.body;
    if(!userId || !Otp){
        return res.json({
              success:false,
              message : "missing Detail"
          })
      }
      try{
        const user = await UserModel.findById(userId);
        if(!user){
             return res.json({
                success : false,
                message : "User not found"
             })
        }
        if(!user.verifyOtp === '' || user.verifyOtp !== Otp){
            return res.json({success:false , message : "User not valid"})
        }
        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success:false , message : "Otp Experied"})
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0
        await user.save();
        return res.json({
            success : true ,
            message : "Email verify Succssefully"
        })
        
      }catch(err){
        return res.json({
            success : false,
            message : err.message
         })
      }
}
export const IsAuthenticated = async(req, res)=>{
  try{
    res.json({success:true})
  }catch(err){
    res.json({
        success:false,
        message:err.message
        
    })
  }
}
export const sendResetOtp = async(req , res)=>{
    const {Email} = req.body;
    if(!Email){
      return  res.json({success:false , meassage : "Email is required"});
    }
    try{
        const user = await UserModel.findOne({Email});
    if(!user){
       return res.json({
            success:false,
            meassage:"User not found"
        })
    }
    const Otp =  String(Math.floor( 100000 + Math.random() * 100000));

     user.restOtp = Otp;
     user.restOtpExpireAt = Date.now() + 15 * 60 * 1000

     await user.save();

     const mailoption = {
        from : 'muhammadhassan872519@gmail.com',
        to: user.Email ,
        subject : `Password Reset Otp`,
        text : `Your Otp for reseting your password is ${Otp}. use this otp to proceed with reseting your password`
    }
    await transporter.sendMail(mailoption)
    return res.json({
        success:true,
        message:"Otp sent your Email"
    })

    }catch(err){
        res.json({
            success:false,
            message:err.message
        })

    }
}
// reset your password
export const ResetPassword = async (req , res) =>{
    const {Email , Otp , newPassword} = req.body;
    if(!Email || !Otp || !newPassword){
        return res.json({
            success:false,
            message:"Email , Otp , and new Password is required"
        })
    }
    try{
        const user = await UserModel.findOne({Email})
        if(!user){
            return res.json({success: false , message : "user not found"})
        }
        if(user.restOtp === "" || user.restOtp !== Otp){
            return res.json({
                success : false,
                message:"Invalid Otp"
            })
        }
        if(user.restOtpExpireAt < Date.now()){
            return res.json({
                success:false,
                message: "otp Expired"
            })
        }
        const IsPassword = await bcrypt.hash(newPassword , 10);
        user.Password = IsPassword;
        user.restOtp = "";
        user.restOtpExpireAt = 0 ;
        await user.save();
        
        return res.json({
            success: true ,
            message : "Password has bess reset Successfully"
        })

    }catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }

}