import jwt from "jsonwebtoken"
import { crateError } from "./error.js";
export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return res.status(401).send("You're not authenticated");
    }
    jwt.verify(token,'shhhhh',(err,user)=>{
        if(err)
        return res.status(403).send("You're not authenticated");
        //assigning this usr to req
        // console.log(req.params.id);
        req.user=user;
        next(); 
    });
}