import connectDB from "../db/connection.js";
import CategoryRouter from "./modules/category/category.router.js"
import cors  from 'cors'
const initApp =(app,express)=>{
    app.use(cors())
    connectDB();
    app.use(express.json());
    app.get('/',(req,res)=>{
        return res.status(200).json({massege:"sucess"})
    })
    app.use("/categories",CategoryRouter);
    app.use('*',(req,res)=>{
        return res.status(404).json({massege:"Page not found"})
    })

}
export default initApp;