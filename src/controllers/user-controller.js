const UserService=require('../services/user-service');
const UserRepository=require('../repository/user-repository');

const userService=new UserService();
const create=async(req,res)=>{
  
    try {
        
        const response=await userService.create({
            email:req.body.email,
            password:req.body.password
        });

        return res.status(201).json({
           message:'Sucessfully created the user ',
           data:response,
           err:{},
           success:true
        })
    } catch (error) {
       console.log(error);
       return res.status(500).json({
         message:'failed to  create the user',
         data:{},
         success:false,
         error:error 
       });
    }
}


const signIn=async(req,res)=>{
    try {
       
        const response=await userService.signIn(req.body.email,req.body.password);
        return res.status(201).json({
            message:'Sucessfully signup the user',
            data:response,
            err:{},
            success:true
         })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          message:'failed to  signup the user',
          data:{},
          success:false,
          error:error 
        });
    }
}
module.exports={
    create,
    signIn
}