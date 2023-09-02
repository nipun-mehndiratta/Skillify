const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.Secret_Key;

//middleware
function authenticatejwt(req,res,next){
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,secretKey,(err,retreivedData) => {
            if(err){res.sendStatus(401);}
            else{
                req.user = retreivedData.username; 
                req.role = retreivedData.role;
                next();
            }
        })
    }
    else{
        res.status(401);
    }
}

module.exports = { 
    authenticatejwt,
}