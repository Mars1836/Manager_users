
import adminModel from '../model/admin.model.js';
const admin =  await adminModel.find({});
class AuthControl{
    login(req,res){

        res.render('./auth/login.pug')
    }
    login_post(req,res,next){
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
}
const authControl = new AuthControl();
export default authControl;