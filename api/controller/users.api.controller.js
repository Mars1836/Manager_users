import e, { Router } from "express";
import userModel from "../../model/users.model.js";
import axios from "axios";
import adminModel from "../../model/admin.model.js";
class UsersApiController{
    async find(req,res){
        try{
            const base64Credentials =  req.headers.authorization.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            const [username, password] = credentials.split(':');

            let ownerUsers = (await adminModel.find({email : username, password: password}))[0].users

            if (!req.query.sort){
                req.query.sort = "{}"
            }
            let sort = JSON.parse(req.query.sort);
            if(sort.field){
                var users = await userModel.find({_id: {$in : ownerUsers}}).sort({[sort.field] : sort.type});
                res.json(users);
            }
            else{
                var users = await userModel.find({_id : {$in :ownerUsers}});
                res.json(users) 
            };
        }catch(err){
            res.sendStatus(403);
        }
        
    }
    async findById(req,res){
        const user = await userModel.findById(req.params.id).exec();
        res.json(user);
    }
    async create(req,res){
        if(!req.body){
            res.status(400).send({message:"Content can not be empty"});
            return;
        }
        const base64IdCredential =  req.headers.authorization.split(' ')[1];
        const auth = Buffer.from(base64IdCredential,'base64').toString();
        const [username,password] = auth.split(':')
        const user =  await userModel.create(req.body);
        await adminModel.updateOne({email:username,password:password},{$push:{users: user.id}})
        res.json({user});
    }
    async update(req,res){
        const update = await userModel.findByIdAndUpdate(req.params.id,req.body);
        res.json(update);
        
    }
    async remove(req,res){
        const remove = await userModel.delete({_id: req.params.id});
        res.json(remove);   
    }
    async findDeleted(req,res){
        try{
            const base64Credentials =  req.headers.authorization.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            const [username, password] = credentials.split(':');

            let ownerUsers = (await adminModel.find({email : username, password: password}))[0].users

            let sort = JSON.parse(req.query.sort);
            if(sort.field){
                let sort = JSON.parse(req.query.sort);
                var users = await userModel.findDeleted({_id : ownerUsers}).sort({[sort.field] : sort.type});
                res.json(users);
            }
            else{
                var users = await userModel.findDeleted({_id : ownerUsers});
                res.json(users) 
            };
        }catch(err){
            console.log(err);
            res.sendStatus(403);
        }
        
    }
    async restore(req,res){
        const user = await userModel.restore({_id : req.params.id})
        res.json(user);
    }
    async delete(req,res){
        const user = await userModel.findOneAndRemove({_id : req.params.id});

        const base64IdCredential =  req.headers.authorization.split(' ')[1];
        const auth = Buffer.from(base64IdCredential,'base64').toString();
        const [username,password] = auth.split(':');
        await adminModel.updateOne({email:username,password:password},{
            $pull : {
                users: user._id
            }
        })
        res.json(user);
    }
}
const usersApiController = new UsersApiController();
export default usersApiController