import express from "express";
import path from "path";
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import cookieParser from "cookie-parser";
import csrf from "csurf";
import 'dotenv/config';
import methodOverride from "method-override";
//router
import routerUsers from "./routes/users.route.js";
import routerAuth from "./routes/auth.route.js";
import inforRouter from "./routes/infor.route.js";
//api
import userApiRouter from "./api/route/users.api.route.js";
import adminInforApiRouter from "./api/route/admin-infor.route.js";
//middleware
import authMiddleware from "./middlewares/auth.middleware.js";
//database
import connectDB from "./database/connection.js";

var csrfProtection = csrf({ cookie: true });
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(
    express.urlencoded({
      extended: true
    })
  )

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json());
app.use(methodOverride('_method'))
app.use('/',express.static(path.join(__dirname,'public')));
connectDB();

app.set("view engine","pug");
app.set("views",'./views');


app.use('/auth',routerAuth);
app.use('/',adminInforApiRouter);
app.use('/',userApiRouter);

app.get('/',authMiddleware.authLogin,async (req,res)=>{
    res.render("index",{
        admin: res.locals.admin
    })
})
app.use('/infor',authMiddleware.authLogin,inforRouter);

app.use('/users',authMiddleware.authLogin,routerUsers);

app.listen(3000,()=>{
    console.log('Server is running...');
}) 