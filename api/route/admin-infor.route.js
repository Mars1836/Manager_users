import express from 'express'
import adminInforApiController from '../controller/admin-infor.controller.js';
const adminInforApiRouter = express.Router();
adminInforApiRouter.get('/api/admin-infor',adminInforApiController.find);
adminInforApiRouter.patch('/api/admin-infor',adminInforApiController.update);
adminInforApiRouter.post('/api/admin-infor',adminInforApiController.insert);
export default adminInforApiRouter;