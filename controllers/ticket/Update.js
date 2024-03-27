const { StatusCodes } = require("http-status-codes")
const ResponseError = require("../../middlewares/error")
const Image = require("../../models/Picture")
const uploadImage = require("../../utils/uploadToCloud")



async function update(req,res,next){

    const {id,image,category} =  req.body

    try {
      const oldImage =   await Image.findById(id)
      if(image){
        const url = await  uploadImage(image);
        oldImage.url = url 
      }
      category && (oldImage.category = category)
     
   const newImage =  await  oldImage.save()
    return  next(res.status(StatusCodes.OK).json({
        success:true,
        message:"Image updated successfully",
        newImage
        
      }))
        
    } catch (error) {
        return next(new ResponseError(error.message,StatusCodes.BAD_REQUEST))
    }

}

module.exports = update