const jwt=require("jsonwebtoken");
const fs=require("fs");
require("dotenv").config();
const authenticate=async(req,res,next)=>{
    const token=req.headers.authorization
    try {
        if(token){
            const tokenValidation=JSON.parse(fs.readFileSync("./blacklist.json","utf-8"));
            if(tokenValidation.includes(token)){
                return res.json({"msg":"Login again"})
            }
            jwt.verify(token,process.env.normalToken,function(err,decoded){
                if(err){
                    res.json({"msg":"Login again!"})
                }else{
                    const userId=decoded.userId;
                    const email=decoded.email;
                    req.body.userId=userId;
                    req.body.userEmail=email;
                    next()
                }
            })
        }else{
            res.json({"msg":"Login again!!"})
        }
    } catch (error) {
        console.log("error from authenticate middleware",error.message);
        res.json({err:error.message});
    }
}

module.exports={
    authenticate
}