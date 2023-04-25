const dotenv=require('dotenv');
const bcrypt=require('bcrypt');
dotenv.config();

const PORT=process.env.PORT;


module.exports={
    PORT:PORT,
    SALT:bcrypt.genSaltSync(10)
}