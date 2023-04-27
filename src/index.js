const express=require('express');
const app=express();
const {PORT}=require('./config/serverConfig')
const apiRoutes=require('./routes/index');
const bodyParser=require('body-parser');
const UserService=require('./services/user-service');
const UserRepository=require('./repository/user-repository')
const prepareAndStartServer=() =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    
    app.use('/api',apiRoutes);


  
   


   
    app.listen(PORT,async()=>{
        const userservice=new UserService();
        const userRepository=new UserRepository();
        // const user=await userRepository.getById(1);
        // const token=userservice.createToken({email:user.email ,id:1});
        // console.log("new token is",token);
        // const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYXpAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTY4MjU5MDY3NSwiZXhwIjoxNjgyNTk0Mjc1fQ.6bbNmjrw1koaS3q3Df08PfJxwpm9P1q3elYvyZd-w6Y"
        // const res=userservice.verifyToken(token);
        // console.log(res);
        console.log(`server started at PORT ${PORT} `);
    })
}

prepareAndStartServer();


