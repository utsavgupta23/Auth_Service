const UserRepository=require('../repository/user-repository');
const jwt=require('jsonwebtoken');
const{JWT_KEY}=require('../config/serverConfig')
const bcrypt=require('bcrypt')
class UserService{
    constructor()
    {
        this.userRepository=new UserRepository();
    }

    async create(data)
    {
        console.log('Hi entered service');
        try {
            const user=await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log('Something went wrong in service layer');
            throw error;
        }
    }



    async signIn(useremail,userInputPlainPassword)
    {
        
        try {
            //step-1 getenctypted password
            const user=await this.userRepository.getuserbyemail(useremail);
            //step-2 checkpassword
            const passwordmatch=this.checkpassword(userInputPlainPassword,user.password);
            if(!passwordmatch)
            {
                console.log('Incorrect password');
                throw {error:'Incorrect password'};
            }

            const newJWTtoken=this.createToken({email:user.email,id:user.id});
            return newJWTtoken;

        } catch (error) {
            console.log('Something went wrong in service layer');
            throw error;
        }
    }


    createToken(user)
    {
        try
        {
          const result=jwt.sign(user,JWT_KEY,{expiresIn:'1h'});
          console.log(result);
          return result;
        }
        catch (error) {
            console.log('Something went wrong in token creation in service layer');
            throw error;
        }
    }

    verifyToken(token)
    {
        try{
            const result=jwt.verify(token,JWT_KEY);
            console.log(result);
            return result;
        }
        catch(error){
            console.log('Something went wrong in token verification in service layer',error);
            throw error;
        }
    }
    
    checkpassword(userInputPlainPassword,encryptedPassword)
    {
        const response=bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        return response;
    }

}

module.exports=UserService;