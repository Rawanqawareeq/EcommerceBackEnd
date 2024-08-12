import connectDB from "../db/connection.js";
import cors  from 'cors'
import CategoryRouter from "./modules/category/category.router.js"
import AuthRouter from "./modules/auth/auth.router.js";
import SubCategoryRouter from "./modules/subcategory/subcategory.router.js";
import ProductRouter from "./modules/product/product.router.js";
import CatRouter from "./modules/cart/cart.router.js";
import CouponRouter from "./modules/coupon/coupon.router.js";
import OrderRouter from "./modules/order/order.router.js";
import UserRouter from "./modules/user/user.router.js";
const initApp = (app,express)=>{
    connectDB();
    app.use(cors())
   
    app.use(express.json());
    app.use("/auth",AuthRouter);
    app.use('/user',UserRouter);
    app.use("/categories",CategoryRouter);
    app.use("/subcategories",SubCategoryRouter);
    app.use("/product",ProductRouter);
    app.use('/cart',CatRouter);
    app.use('/coupon',CouponRouter)
    app.use('/order',OrderRouter)
    app.get('/',(req,res)=>{
        return res.status(200).json({massege:"sucsess"})
    });
    app.use('*',(req,res)=>{
        return res.status(404).json({massege:"Page not found"})
    });

}
export default initApp;