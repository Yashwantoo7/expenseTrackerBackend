const jwt = require('jsonwebtoken');

const generateToken =(user)=>{
    return jwt.sign({id:user.id,name:user.name,email:user.email}
        ,process.env.JWT_SECRET||'somethingsecret',{
            expiresIn:'30d'
        })
}


const isAuth = (req,res,next)=>{
    const authorization = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7,authorization.length); //Bearer XXXXXX
        jwt.verify(
            token,
            process.env.JWT_SECRET|| 'somethingsecret',
            (err,decode)=>{
                if(err){
                    res.status(401).send({msg:'Invalid Token'});
                }else{
                    req.user = decode;
                    next();
                }
            }
        );
    }
    else{
        res.status(401).send({msg:'No Token'});
    }
}

module.exports = {
    isAuth,
    generateToken
}