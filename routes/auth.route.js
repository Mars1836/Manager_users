import express from 'express';
import authControl from '../controller/auth.controller.js'
let routerAuth = express.Router();
routerAuth.get('/',authControl.login);
routerAuth.post('/',authControl.login_post);
export default routerAuth;