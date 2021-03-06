import axios from "axios";
import userModel from "../model/users.model.js";
import adminModel from "../model/admin.model.js";
class Controller{
    constructor(){

    }
    async index(req,res){
        const nameFilter = req.query.name|| '';
        const url = req.protocol + '://' + req.get('host') + '/api/users';
        const usersdb = (await axios.get(url,{
            auth: {
                username : res.locals.admin.email,
                password : res.locals.admin.password
            },
            params:{
                sort : {
                    field : req.query.field,
                    type : req.query.type
                }
            }
        }, )).data
        const users = usersdb.filter((user)=>{
            return user.name?.toUpperCase().includes(nameFilter.toUpperCase() )
        });
        const max = 5;
        const num = 3;
        const admin = res.locals.admin
        const maxpage = Math.ceil(users.length/max);
        const countTrash = await userModel.countDeleted({_id : {$in : admin.users}});
        let page = parseInt(req.query.page)||1;
        let spage;
        if(page === maxpage){
            spage = (page-2 > 0) ? page - 2 : 1;
        }
        else{spage = (page-1 > 0) ? page-1 : 1;
        }
        res.render("users/index",{
            nameFilter,
            countTrash,
            users: users.slice((page-1)*max,page*max),
            index: (page-1)*max+1,
            spage: spage,
            epage: (spage + (num -1) < maxpage) ? spage + (num -1) : maxpage ,
            cpage: page,
            maxpage
        })
    }
    async index_post(req,res){
        const newU = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        };
        const url = req.protocol + '://' + req.get('host') + '/api/users';
         axios.post(url,newU,{
            auth:{ 
                username: res.locals.admin.email,
                password: res.locals.admin.password
            }
        })
         .then((res)=>{})
         .catch((err)=>{console.log(err)})
        res.redirect("/users");
    }
    async action(req,res){
        const usersSelect = req.body.usersSelect;
        if(req.body.action==='delete'){
            const users = await userModel.delete({_id: {$in: usersSelect}})
        }
        res.redirect('/users');
    }
    async trash(req,res){
        const nameFilter = req.query.name|| '';
        const url = req.protocol + '://' + req.get('host') + '/api/users/deleted';
        const usersdb = (await axios.get(url,{
            auth:{ 
                username: res.locals.admin.email,
                password: res.locals.admin.password
            },
            params:{
                sort : {
                    field : req.query.field,
                    type : req.query.type
                }
            }
        })).data
        const users = usersdb.filter((user)=>{
            return user.name.toUpperCase().includes(nameFilter.toUpperCase() )
        });
        const max = 5;
        const num = 3;
        const maxpage = Math.ceil(users.length/max);
        let page = parseInt(req.query.page)||1;
        let spage;
        if(page === maxpage){
            spage = (page-2 > 0) ? page - 2 : 1;
        }
        else{spage = (page-1 > 0) ? page-1 : 1;
        }
        res.render("users/trash",{
            nameFilter,
            users: users.slice((page-1)*max,page*max),
            index: (page-1)*max+1,
            spage: spage,
            epage: (spage + (num -1) < maxpage) ? spage + (num -1) : maxpage ,
            cpage: page,
            maxpage
        })
    }
    async trash_action(req,res){
        const usersSelect = req.body.usersSelect;
        if(req.body.action==='delete'){
            const users = await userModel.remove({_id: {$in: usersSelect}})
        }
        else if(req.body.action==='restore'){
            const users = await userModel.restore({_id: {$in: usersSelect}})
        }
        res.redirect('/users/trash');
    }
    async update(req,res){
        const id = req.params.id;
        const url = req.protocol + '://' + req.get('host') + '/api/users';
        const newU = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        };
        const user = (await axios.get(`${url}/${id}`,newU)).data
        res.render('users/update',{
            user
        })
    }
    async update_post(req,res){
        const id = req.params.id
        const url = req.protocol + '://' + req.get('host') + '/api/users';
        const newU = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        };
        await axios.put(`${url}/${id}`,newU)
        res.redirect('/users');
    }
    async restore(req,res){
        const id = req.params.id
        const url = req.protocol + '://' + req.get('host') + '/api/users';
        await axios.patch(`${url}/restore/${id}`);
        res.redirect('/users')
    }
    async delete(req,res){
        const id = req.params.id
        const url = req.protocol + '://' + req.get('host') + '/api/users';
        await axios.delete(`${url}/delete/${id}`,{
            auth:{ 
                username: res.locals.admin.email,
                password: res.locals.admin.password
            }
        })
        .then()
        .catch((err)=>{
            console.log(err);
        })
        res.redirect('/users/trash');
    }
}
const controller = new Controller();
export default controller
