const app=require("express")()
const express=require("express")
const basicroutes=require("./controller/basicroutes")
const musicroutes=require('./controller/musiccontroller')
require('./config/db');
const dotenv          =     require('dotenv');
const fileUpload      =     require('express-fileupload');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(fileUpload());
app.use(express.static(`${__dirname}/public`));
app.use("/",basicroutes)
app.use('/track',musicroutes)
app.listen(3000,()=>{
    console.log("application is ready on 3000")
})