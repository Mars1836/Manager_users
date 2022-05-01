import express from "express";
import controller from '../controller/users.controller.js';

var routerUsers = express.Router();
routerUsers.get('/',controller.index);
routerUsers.post('/',controller.index_post);
routerUsers.post('/action',controller.action);
routerUsers.get('/trash',controller.trash);
routerUsers.post('/trash/action',controller.trash_action);
routerUsers.get('/update/:id',controller.update);
routerUsers.post('/update/:id',controller.update_post);
routerUsers.post('/restore/:id',controller.restore);
routerUsers.post('/delete/:id',controller.delete);
export default routerUsers;