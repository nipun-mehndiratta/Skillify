const jwt = require('jsonwebtoken');
const SecretKey= "n8n2n6"; 

//middleware
function authenticatejwt(req,res,next){
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,SecretKey,(err,retreivedData) => {
            if(err){res.sendStatus(401);}
            else{
                req.user = retreivedData.username; 
                req.role = retreivedData.role;
                next();
            }
        })
    }
    else{
        res.sendStatus(401);
    }
}

module.exports = { 
    authenticatejwt,
    SecretKey
}