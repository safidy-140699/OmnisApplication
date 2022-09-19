const controller = require("../controllers/message.controllers");
const upload = require("../middleware/upload");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/AddMessage",upload.single("file"),controller.AddMessage);
  app.get("/api/UploadMessage",controller.UploadMessage);
};