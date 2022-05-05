const router= require("express").Router()
const mongoose=require("mongoose")
const streamifier=require("streamifier")
router.post('/upload', (req, res) => {
    console.log(req.body);
    console.log(req.files.file);  
    let element=req.files.file;
    // console.log(filesToUpload)
    let filename = req.files.file.name;

    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'filesBucket'
    });
    gridfsbucket.find({filename:element.name}).toArray((err, files) => {
        if (!files || files.length === 0) {        
            console.log("no files")
            streamifier.createReadStream(element.data).
            pipe(gridfsbucket.openUploadStream(element.name,{aliases:req.body.name,
            metadata:{
                details:req.body
            }
        })).
        on('error', function (error) {
        assert.ifError(error);
        }).
        on('finish',function () {
        console.log(`${element.name} uploading done!`);
        return res.redirect('/');
    });
        } else {
            return res.redirect('/')
        }
    });
    
})


router.get("/delete/:id",(req, res) => {
    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'filesBucket'
    });
    gridfsbucket.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
          if (err) return res.status(404).json({ err: err.message });
      res.redirect(`/`);
    });
  });

router.get("/play/:id",(req,res)=>{
    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');
    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'filesBucket'
    });

    let downloadStream= gridfsbucket.openDownloadStreamByName(req.params.id);
    downloadStream.on('data',(chunk)=>{
        res.write(chunk);
    });
    downloadStream.on('error',()=>{
        res.sendStatus(404);
    });
    downloadStream.on('end',()=>{
        res.end();
    });
})
module.exports=router