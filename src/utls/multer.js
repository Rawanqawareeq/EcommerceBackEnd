import multer from 'multer'
export const fileType = {
    image :['image/png','image/jpeg','image/webp'],
    pdf:['application/pdf'],
    excel:['text/csv','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
};
function flieUpload(customtypes = []){
    const storage = multer.diskStorage({});
    function fileFilter (req, file, cb) {
       if(customtypes.includes(file.mimetype)){
        cb(null, true)
       }else{
         cb("invalid format", false)
       }
      }
    const upload =multer({fileFilter,storage});
    return upload;

}
export default flieUpload;
