import { Router } from "express";

const uploadRouter = Router();

uploadRouter.get("/", (req, res) => {
  res.render("upload");
});

uploadRouter.post("/", (req, res) => {
  if (req.files) {
    if(req.files.file.size > 5*1024*1024){
        res.render("download", { error: null, file_code: null });
    }
    const file = req.files.file;
    const fileName = file.name.replaceAll(" ", "_");
    file.mv(`./store/${fileName}`, (err) => {
      if (err) {
        console.log(err);
        res.render("error", { errorCode: "500", errorText: err });
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.render("download", { error: null, file_code: null });
  }
});

export default uploadRouter;



// [Object: null prototype] {
//     file: {
//       name: '5000_7000_English_words_removed (3).xlsx',
//       data: <Buffer 50 4b 03 04 14 00 06 00 08 00 00 00 21 00 41 37 82 cf 6e 01 00 00 04 05 00 00 13 00 08 02 5b 43 6f 6e 74 65 6e 74 5f 54 79 70 65 73 5d 2e 78 6d 6c 20 ... 25753 more bytes>,
//       size: 25803,
//       encoding: '7bit',
//       tempFilePath: '',
//       truncated: false,
//       mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//       md5: 'dfa765c45bdab6d9028c52e76ad0b2d0',
//       mv: [Function: mv]
//     }
//   }