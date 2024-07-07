import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
        cloud_name: 'dcdpudlri', 
        api_key: '351629883435271', 
        api_secret: '<your_api_secret>' // Click 'View Credentials' below to copy your API secret
});
export default cloudinary;