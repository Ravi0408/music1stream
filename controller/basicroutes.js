const router= require("express").Router()
const mongoose=require("mongoose")
const streamifier=require("streamifier")
router.get('/',(req,res)=>{
        var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            chunkSizeBytes: 1024,
            bucketName: 'filesBucket'
        });
        gridfsbucket.find().toArray((err, files) => {
            if (!files || files.length === 0) {        
                // console.log("no files")        
                return res.render("Homepage.ejs", {files: null});
            } else {
              const data = files
                .map(file => {
                    return file;
                })
                console.log(data)
                res.render("Homepage.ejs", {files: data});
            }
          });
    
    
})

module.exports=router