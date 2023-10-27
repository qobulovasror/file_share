import { Router } from "express";


const HomeRouter = Router()

HomeRouter.get('/', (req, res)=>{
    res.redirect('/download')
})

export default HomeRouter