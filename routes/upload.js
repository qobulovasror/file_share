import { Router } from "express";
import {unlink, readdir} from 'fs';
import path from "path";
import genId from "../services/generateId.js";
import linkCache from '../services/cache.js';
import { dirSize } from "../services/getSize.js";
import replaseUrl from "../services/replaseUrl.js";

const uploadRouter = Router();

uploadRouter.get("/", async(req, res) => {
  res.render("upload");
});

uploadRouter.get("/delete", async(req, res) => {
  try {
    readdir('./store', (err, files) => {
      if (err) throw err;
      for (const file of files) {
        unlink(path.join('./store', file), (err) => {
          if (err) throw err;
        });
      }
    });
    res.render("upload");
  } catch (error) {
    res.render("error", { errorCode: "500", errorText: error });
  }
});

uploadRouter.post("/", async (req, res) => {
  try {
    const size = await dirSize( './store' );
    if(size/1024/1024 > 20){
      res.render("error", { errorCode: "500", errorText: "Out of memory, please try again later" });
    }
    if (req.files) {
      if(req.files.file.size > 5*1024*1024){
          res.render("download", { error: null, file_code: null });
      }
      const file = req.files.file;
      const fileName = replaseUrl(file.name);
      // const fileName = file.name.replaceAll(" ", "_");
      file.mv(`./store/${fileName}`, (err) => {
        if (err) {
          console.log(err);
          res.render("error", { errorCode: "500", errorText: err });
        }
      });
      const key = genId()
      linkCache.set(key, fileName, 300*1000) 
      setTimeout(()=>{
        unlink(`./store/${fileName}`, (err)=>{
          if(err) console.log(err);
          res.render("error", { errorCode: "500", errorText: err });
        })
      }, 5*60*1000);
      res.render("download", { error: null, file_code: key });
    } else {
      res.render("download", { error: null, file_code: null });
    }
  } catch (error) {
    res.render("error", { errorCode: "500", errorText: error });
  }
});

export default uploadRouter;