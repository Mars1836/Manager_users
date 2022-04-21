import db from '../db.js'
import shortid  from "shortid";
await db.read();
const {users} = db.data;

class Controller{
    constructor(){

    }
    index(req,res){
        res.render("users/index")
    }
    async index_post(req,res){
        req.body.id = shortid.generate();
        console.log(req.body);
        users.push(req.body);
        await db.write();
        res.redirect("/users")
    }
    create(req,res){
        res.render('./users/create.pug');
    }
    user(req,res){
        let user = users.find((user)=>{
            return user.id == id
        })
        res.render('users/view',{
            user
        })
    }
    create_post(req,res){
        req.body.id = shortid.generate();
        res.redirect('/');
    }
}
const controller = new Controller();
export default controller
