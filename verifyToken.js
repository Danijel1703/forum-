const jwt = require('jsonwebtoken');

module.exports = function (req,res,next) {
    const token = req.cookies['login-token'];
    const currentUser = req.cookies['currentUser'];
   
    if(!token){
        res.status(401).send('You must log in first!');
        next();
    }
    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        
    }
}