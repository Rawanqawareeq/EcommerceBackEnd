export  default const returnErrorMeassage =(message,sataus)=>{
    return (req,res)=>{
        return res.status(sataus).json({message});
    }
}