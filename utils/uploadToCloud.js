const cloudinary =  require("cloudinary").v2;



cloudinary.config(
    {
        api_key:process.env.api_key,
        cloud_name:process.env.cloud_name,
        api_secret:process.env.api_secret
    }
)


const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
  };
  
  const uploadImage = (image) => {
    //imgage = > base64
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(image, opts, (error, result) => {
        // console.log(result)
        if (result && result.secure_url) {
          // console.log(result.secure_url,"URL");
          return resolve(result.secure_url);
        }
        // console.log(error.message,"");
        return reject({ msg: error.message });
      });
    });
  };
  module.exports = uploadImage