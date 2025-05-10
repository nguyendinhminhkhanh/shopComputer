const User = require("../models/User");
class authController{
    //[GET] /auth/login
    login(req,res,next){
        res.render('login');
    }

    //[GET] /auth/register
    register(req,res,next){
        res.render('register');
    }

    //[POST] /auth/register
    async registerHandle(req,res,next){
        const  user = new User({
            ...req.body
        })
        await user.save();
        res.render("/auth/login");
    }
}

module.exports = new authController;