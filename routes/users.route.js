import express from "express";

import controller from '../controller/users.controller.js';
var routerUsers = express.Router();
routerUsers.get('/',controller.index);
routerUsers.post('/',controller.index_post);
routerUsers.get('/:id',controller.user);
export default routerUsers;