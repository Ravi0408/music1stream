const mongoose= require("mongoose");
const dotenv=require('dotenv');
dotenv.config();

const connection=mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser:true,useUnifiedTopology:true, useUnifiedTopology: true,
    },
    ()=>{
        console.log('connected to db!')
});

mongoose.Promise=global.Promise;

const db=mongoose.connection;

db.on('error', console.error.bind(console,'MongoDB connection error'));

// console.log(Object.keys(db.collections));

module.exports=db;