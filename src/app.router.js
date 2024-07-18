import connectDB from "../db/connection.js";
import cors  from 'cors'
import CategoryRouter from "./modules/category/category.router.js"
import AuthRouter from "./modules/auth/auth.router.js";
import SubCategoryRouter from "./modules/subcategory/subcategory.router.js";
import ProductRouter from "./modules/product/product.router.js";
import CatRouter from "./modules/cart/cart.router.js";
const initApp = (app,express)=>{
    connectDB();
    app.use(cors())
   
    app.use(express.json());
    app.use("/auth",AuthRouter);
    app.use("/categories",CategoryRouter);
    app.use("/subcategories",SubCategoryRouter);
    app.use("/product",ProductRouter);
    app.use('/cart',CatRouter);

    app.get('/',(req,res)=>{
        return res.status(200).json({massege:"sucsess"})
    });
    app.use('*',(req,res)=>{
        return res.status(404).json({massege:"Page not found"})
    });

}
export default initApp;