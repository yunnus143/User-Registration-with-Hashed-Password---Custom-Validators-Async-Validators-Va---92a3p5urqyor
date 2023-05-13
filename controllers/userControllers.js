const users   =require("../models/user.js");
const bcrypt = require('bcrypt');

/*
Post request json file structure


    obj =  {
        "name":name,
        "email":email,
        "password": password
    }

 */

//You need to complete the route of user register
//you need to register the user and return the id assign to the user.
//the password you save in database should be hashed using bcrypt libary.
//you will get error if user mail allready exist in that case you need to return 404 status with err message that you get.
//to look the user schema look ../models/user.js

const registerUser =async (req, res) => {

    //Write you code here
     const name = req.body.name;
    const email  = req.body.email;
    const password = req.body.password;
    const DOB = req.body.DOB;


    // Generate a salt to be used for hashing
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    var newuser = {
        "name":name,
        "email":email,
        "password": hashedPassword,
        "DOB":DOB
    };
    users.create(newuser).then((user) => {
        res.send(user._id);
    })
    .catch((error) => {
        res.status(404).send(error.message);
    });
}

module.exports = { registerUser };
