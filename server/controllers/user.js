import { crateError } from "../error.js"
import User from "../models/User.js";
import Video from "../models/Video.js";
export const update= async (req,res,next)=>{
    if(req.params.id===req.user.id){
        try{
            const updatedUser= await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            res.status(200).json(updatedUser);
        }
        catch(err){
             next(err);
        }
    }
    else
    return next(crateError(400,"you can update only your account"));
}
export const deleteUser=async (req,res,next)=>{
    if(req.params.id===req.user.id){
        try{
            const updatedUser= await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        }
        catch(err){
             next(err);
        }
    }
    else
    return next(crateError(400,"you can delete only your account"));
}
export const getUser=async (req,res,next)=>{
    try{
      const user=await User.findById(req.params.id);
      if(!user){
        return next(crateError(400,"No such User exists"));
      }
    //   console.log(user.name);
      res.status(200).json(user);
    }
    catch(err){
        next(err);
    }
}
export const subscribe=async (req,res,next)=>{
    try{
        console.log("subscribe");
        await User.findByIdAndUpdate(req.user.id,{
            // pushes in the array
            $push:{subscribedUsers:req.params.id},
        })

        await User.findByIdAndUpdate(req.params.id,{
            // increaments the subscribers count by 1
            $inc:{subscribers:1},
        })
        res.status(200).json("subscription successful");
    }
    catch(err){
        next(err); 
    }
}
export const unSubscribe=async (req,res,next)=>{
    try{
        console.log("unsubscribe");
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers:req.params.id},
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:-1},
        })
        res.status(200).json("unsubscription successful");
    }
    catch(err){
        next(err); 
    }
}
export const like=async (req,res,next)=>{
    const id=req.user.id;
    const videoId=req.params.videoId;
    const temp= await Video.findById(videoId);
    console.log(videoId);
    console.log(temp);
    try{
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        })
        
        res.status(200).json("The video has been liked");
    }
    catch(err){
        next(err); 
    }
}
export const dislike= async(req,res,next)=>{
    const id=req.user.id;
    const videoId=req.params.videoId;
    try{
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })
        
        res.status(200).json("The video has been disliked");
    }
    catch(err){
        next(err); 
    } 
}