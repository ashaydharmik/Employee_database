const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploaded-image");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null,Date.now() + ext);
  }
});


const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    if(
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg" || 
        file.mimetype === "image/jpg" 
    ){
        cb(null, true)
    }else{
        console.log("only jpg and png file supported")
        cb(null, false)
    }
  },
  limits:{
    fileSize: 1024 * 1024 * 2
  } 
});

module.exports = upload;
