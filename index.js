import express from "express";
import path from "path";
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import db from './db.js'
import routerUsers from "./routes/users.route.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
    express.urlencoded({
      extended: true
    })
  )
  
app.use(express.json())

app.use('/',express.static(path.join(__dirname,'public')));
app.set("view engine","pug");
app.set("views",'./views');
app.get('/',(req,res)=>{
    console.log(req.query);
    res.render("index",{
        name:"Hau vu",
    })
})
app.use('/users',routerUsers);
app.listen(3001,()=>{
    console.log('Server is running...');
})