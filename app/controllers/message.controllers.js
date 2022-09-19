const db = require("../models");
const fs=require("fs");
const User = db.user;
const Message=db.message;
const Op = db.Sequelize.Op;
const path = require("path");
exports.home = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../images/`));
};
exports.AddMessage = async (req, res) => {
  // Save Message to Database
  
  try {
    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    const message = await Message.create({
      title : req.body.title ,
      date:Date.now(),
      content:req.file.filename/*fs.readFileSync(
        __basedir + "/images/" + req.file.filename
      ),*/
    }).then((image)=>{
      fs.writeFileSync(
        __basedir + "/images/tmp/" + image.name,
        image.data
      );
    });
       message.setUsers(req.body.userId);
        
     res.status(201).send({ message: "message est bien enregister!" });
    
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.UploadMessage = (req, res) => {
  Message.findAll().then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
