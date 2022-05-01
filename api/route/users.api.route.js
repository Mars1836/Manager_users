import express from 'express';
import usersApiController from '../controller/users.api.controller.js';
const userApiRouter = express.Router();
userApiRouter.patch('/api/users/restore/:id',usersApiController.restore);
userApiRouter.delete('/api/users/delete/:id',usersApiController.delete);
userApiRouter.get('/api/users/deleted',usersApiController.findDeleted)  
userApiRouter.get('/api/users',usersApiController.find);
userApiRouter.get('/api/users/:id',usersApiController.findById)
userApiRouter.post('/api/users',usersApiController.create);
userApiRouter.put('/api/users/:id',usersApiController.update);
userApiRouter.delete('/api/users/:id',usersApiController.remove);
export default userApiRouter
