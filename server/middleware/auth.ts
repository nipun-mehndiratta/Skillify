import jwt from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';
require('dotenv').config();

const secretKey = process.env.Secret_Key!;

//middleware
function authenticatejwt(req :Request,res :Response,next :NextFunction){
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,secretKey,(err,payload) => {
            if(err){
                return res.sendStatus(403);
            }
            if(!payload){
                return res.sendStatus(403);
            }
            if(typeof payload === 'string'){
                return res.sendStatus(403);
            }
                req.headers["user"] = payload.username; 
                req.headers["role"] = payload.role;
                next();  
        })
    }
    else{
        res.status(401);
    }
}

export default authenticatejwt;