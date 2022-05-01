import multer from 'multer';
import express from 'express';
import inforControl from '../controller/infor.controller.js';

const upload = multer({ dest: './public/uploads/img/' })
const inforRouter = express.Router();
inforRouter.get('/',inforControl.index)
inforRouter.post('/',upload.single('avatar'),inforControl.index_post)
export default inforRouter;