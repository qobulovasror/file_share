import Express from 'express';
import fileUploader from 'express-fileupload';

export default function (app) {
  app.use(Express.static('./public'));
  app.use(fileUploader({ limits: 5 * 1024 * 2024 }));
  app.use(Express.json());
  app.use(Express.urlencoded({ extended: true }));

  app.set("view engine", "ejs");
}
