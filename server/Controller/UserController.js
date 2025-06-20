import UserModel from "../models/UserModel.js";

export const getUserData = async (req , res)=>{
    try{
          const {userId} = req.body;
          const user = await UserModel.findById(userId);

          if(!user){
            return res.json({
                success:false,
                message : "user not found"
            })
          }
          res.json({
            success : true,
            userData:{
                Name : user.Name,
                isAccountVerified : user.isAccountVerified
            }
          })

    }catch(err){
        res.json({
            success : false,
            message: err.message
        })
    }
}