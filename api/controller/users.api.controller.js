import e, { Router } from "express";
import userModel from "../../model/users.model.js";
class UsersApiController{
    async find(req,res){
        if(req.query.sort){
            let sort = JSON.parse(req.query.sort);
            var users = await userModel.find({}).sort({[sort.field] : sort.type});
            res.json(users);
        }
        else{
            var users = await userModel.find({});
            res.json(users) 
        };
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
        const user =  await userModel.create(req.body);
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
        if(req.query.sort){
            let sort = JSON.parse(req.query.sort);
            var users = await userModel.findDeleted({}).sort({[sort.field] : sort.type});
            res.json(users);
        }
        else{
            var users = await userModel.findDeleted({});
            res.json(users) 
        };
    }
    async restore(req,res){
        const user = await userModel.restore({_id : req.params.id})
        res.json(user);
    }
    async delete(req,res){
        const user = await userModel.remove({_id : req.params.id});
        res.json(user);
    }
}
const usersApiController = new UsersApiController();
export default usersApiController