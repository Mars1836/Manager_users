import e from "express";
import adminModel from "../model/admin.model.js";
import axios from "axios";
class AuthMiddleware{
    async authLogin(req,res,next){
        if(!req.signedCookies.id){
            res.redirect('/auth');
            return;
        }
        else{
            let admin =await adminModel.find({
                _id: req.signedCookies.id
            })
            if(!admin){
                res.redirect('/auth');
                return;
            }
            else{
                res.locals.admin = admin[0];
                next();
            }
        }

    }
}
const authMiddleware = new AuthMiddleware();
export default authMiddleware