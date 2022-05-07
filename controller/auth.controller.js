
import adminModel from '../model/admin.model.js';
class AuthControl{
    login(req,res){
        res.render('./auth/login.pug')
    }
    async login_post(req,res,next){
        const admin =  await adminModel.find({});
        let adIn = req.body;
        let adlg = admin.find((ad)=>{

            return (ad.email === adIn.email && ad.password === adIn.password);
        })

        if(adlg){
            res.cookie("id",adlg._id,{
                signed : true
            });
            res.redirect('/')
        }
        else{
            res.redirect('/auth');
        }
    }
    register(req,res){
        res.render('./auth/register.pug');
    }
    register_post(req,res){
        const admin = {
            email : '',
            password : '',
            infor : {
                avatar : 'avt.png',
                name : '',
                position : '',
                decription: '',
            },
            users:[]
        }
        const data = req.body;
        Object.assign(admin,{
            email :data.email,
            password : data.password,
            infor : {
                avatar : admin.infor.avatar,
                name : data.name,
                position : admin.infor.position,
                decription: admin.infor.decription,
            }
        })
        adminModel.create(admin);
        res.redirect('/auth')
    }
}
const authControl = new AuthControl();
export default authControl;