import pkg from 'cloudinary';
import fs, { unlinkSync } from 'fs';
const {v2:cloudinary}=pkg;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localPath)=>{
    try{
      if(!localPath) return null;
      const response = await cloudinary.uploader.upload(localPath, {
        resource_type:"auto"
      }) // file has beeen uploaded successfully

      console.log("File uploaded successfully...",response.url);
      return response
    }
    catch(error){
      fs.unlinkSync(localPath);
      // remove the locally saved temporary file as the upload option opration got failed
      return null;
    }
}

export {uploadOnCloudinary}

//this is for upload file 