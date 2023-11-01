import { Router } from "express";
import linkCache from '../services/cache.js';
import mime from 'mime'
import path from 'path'; 
import fs from 'fs';

const DownloadRouter = Router();
const __dirname = path.resolve();

DownloadRouter.get("/", (req, res) => {
  res.render("download", { error: null, file_code: null });
});

DownloadRouter.get("/:file", (req, res) => {
  try {
    if(req.query.key && req.query.key.length > 3){
      const key = req.query.key;
      const url = linkCache.get(key);
      if(url==undefined){
        return res.render("error", { errorCode: "500", errorText: "file not found" });
      }
      var file = __dirname + `/store/${url}`;
      var filename = path.basename(file);
      var mimetype = mime.getType(file);
      res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      res.setHeader('Content-type', mimetype);
      var filestream = fs.createReadStream(file);
      filestream.pipe(res);
    }else{
      return res.render("error", { errorCode: "500", errorText: "bad request" });
    }
  } catch (error) {
    return res.render("error", { errorCode: "500", errorText: error });
  }
});

export default DownloadRouter;