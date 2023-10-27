import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import options from '../assets/data.js';

import upload from './upload.js'
import download from './download.js'
import home from './home.js'

const swaggerSpec = swaggerJSDoc(options);
  
export default function(app){
    app.get('/', home)
    app.use('/upload', upload)
    app.use('/download', download);

    // app.use('/api/upload')
    // app.use('/api/download')
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

}


