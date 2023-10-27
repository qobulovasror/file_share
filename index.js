import Express from 'express';
import {writeFile, readFile} from 'fs';

import DefaultMiddlewares from './middlewares/default.js'
import Routes from './routes/index.js';

const app = Express();

DefaultMiddlewares(app)

const PORT = process.env.PORT || 5000;

async function start(){
  try {
    
    app.listen(PORT, () => {
      console.log(`🚀 SERVER READY @ http://localhost:${PORT}`)
    })
    Routes(app)
  } catch (error) {
    console.log(`Server error: ${error}`);
  }
}

start().then()