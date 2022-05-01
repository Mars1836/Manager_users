import adminModel from "../../model/admin.model.js";
class AdminInforApiController{
    async find(req,res){
        const admin = await adminModel.find();
        res.json(admin);
    }
    async update(req,res){
        const admin = req.body;
        console.log(admin);
        await adminModel.updateOne({_id : admin.id},{infor : admin.infor});
        res.json(admin);
    }
}
const adminInforApiController =new AdminInforApiController();
export default adminInforApiController;