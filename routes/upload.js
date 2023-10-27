import {Router} from "express";

const uploadRouter = Router()

uploadRouter.get('/', (req, res)=>{
    res.render('upload')
})

uploadRouter.post('/', (req, res)=>{
    
})

export default uploadRouter;