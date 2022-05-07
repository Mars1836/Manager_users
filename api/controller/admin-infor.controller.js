import adminModel from "../../model/admin.model.js";
class AdminInforApiController{
    async find(req,res){
        const admin = await adminModel.find({},{password: 0});
        res.json(admin);
    }
    async update(req,res){
        const admin = req.body;
        await adminModel.updateOne({_id : admin.id},{infor : admin.infor});
        res.json(admin);
    }
    async insert(req,res){
        const userid = req.body.userid;
        await adminModel.updateOne({_id : req.signedCookies.id},{$push:{users: userid}})
    }
}
const adminInforApiController =new AdminInforApiController();
export default adminInforApiController;