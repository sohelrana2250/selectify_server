

import httpStatus from "http-status";
import AppError from "../../app/error/AppError";
import { users } from "../User/user.model";
import { TAuth } from "./auth.interface";
import config from "../../app/config";
import { jwtHalpers } from "../../app/jwtHealpers/jwtHealpers";


const createValidationTokenIntoDb=async(payload:TAuth)=>{

    const isUserExits=await users.findOne({email:payload.email},{
        email:true,
        _id:true,role:true,isVerify:true
    });
    const jwtPayload={
        id:isUserExits?.id,
        role:isUserExits?.role,
        email:isUserExits?.email
    }

    if(isUserExits?.isVerify){

        const accessToken= jwtHalpers.generateToken(jwtPayload,config.jwt_access_srcret as string, config.expries_in_token as string);
        return accessToken;
    }
    else{

        const verified=await users.findOneAndUpdate(isUserExits?._id,{isVerify:true},{new:true,upsert:true});
       if(!verified){
        throw new AppError(httpStatus.UNAUTHORIZED,'varified issues','');

       }
       const accessToken= jwtHalpers.generateToken(jwtPayload,config.jwt_access_srcret as string, config.expries_in_token as string);
        return accessToken;
    }
}


const updateMyProfileFromDb=async({name,photo}:{ name:string,photo:string},id:string)=>{

   const result=await users.findByIdAndUpdate(id,{name:name,photo:photo},{new:true,upsert:true});
   return result;
}
const  chnageUserRoleStatusFromDb=async(id:string,data:{role:string})=>{

     const result=await users.findByIdAndUpdate(id,{role:data.role},{new:true,upsert:true});
     return result;

}
const specificUserRollIntoDb=async(id:string)=>{
    
    const result = await users.findById(id).select('role');
    return result; 
}
export const AuthService={
    createValidationTokenIntoDb,
    updateMyProfileFromDb,
    chnageUserRoleStatusFromDb,
    specificUserRollIntoDb
}