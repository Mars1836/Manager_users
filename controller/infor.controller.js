import adminModel from "../model/admin.model.js";
import axios from "axios";
class InforControl{
    index(req,res){
        res.render('infor.pug',{admin: res.locals.admin});
    }
    async index_post(req,res){
        const ADMIN_API_URL = req.protocol + '://' + req.get('host') + '/api/admin-infor';
        const admin = {}
        admin.id = req.signedCookies.id;
        admin.infor = req.body;
        if(req.file){
            admin.infor.avatar = req.file.filename;
        }
        else
        {
            admin.infor.avatar = 'avt.png';
        }
        axios.patch(ADMIN_API_URL,admin)
        .then((res)=>{
            console.log('update success!!')
        })
        .catch((err)=>{
            console.log(err);
        })
        res.redirect('/');
    }

}
const inforControl = new InforControl();
export default inforControl;