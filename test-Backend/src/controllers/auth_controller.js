
const User = require('..//adapters/user');

var jwt = require('jsonwebtoken');
const JWT_SECRET = "U8sp1ioD6mJjFZwCHpMRhJHvruuH7yC9xvol3Te1dSRqA1EZSplNE0j5zay9JgvZ05eaR1Rmr6PtTLMsGGU6aTBJWCvigsPP0H9a";


const { createHash } = require('crypto');
const Auth = require('..//adapters/auth'); 




function hash(string) {
    return createHash('sha256').update(string).digest('hex');
}
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

async function login(req, res) {
   
    try{
        let body = req.body;
        let username = body['username'];
        let password = body['password'];
        password = hash(password);
        let doesAdminExist = await Auth.findOne({_id: username, password});
        if(!doesAdminExist){
            return res.status(403).json({
                "message": "Invalid Credentials"
            });
        }
        if(doesAdminExist['role'] == "admin"){
            const token = jwt.sign({
                username, role: 'admin'
            }, JWT_SECRET);
            return res.status(201).json({
                "message": "Logged In Successfully!",
                token
            });
        }

        const getUserProfileData = await User.findOne({_id: username});

        const token = jwt.sign({
            username, role: 'user', profile: getUserProfileData
        }, JWT_SECRET);
        return res.status(201).json({
            "message": "Logged In Successfully as User!",
            token
        });
    }catch {
        return res.status(500).json({
            message: "Some Error Occurred!"
        });
    }
}


// Controller function to handle organization registration

async function registerUser(req, res) {
    console.log("is it here for user signup")
    try{
        let body = req.body;
        let username = body['name'];
        let password = body['password'];
        
        password = hash(password);
        body['password'] = password
        let doesUsernameExist = await Auth.findOne({_id: username});
        if(doesUsernameExist){
            return res.status(403).json({
                "message": "Username already exists!"
            });
        }
        body['_id'] = body['name'];
        const newAuth = await Auth.create({_id: username, password, role: "user"})
        const newUser = await User.create(body);
        const token = jwt.sign({
            username, role: 'user', profile: newUser
        }, JWT_SECRET);
        return res.status(201).json({
            "message": "Successfully Signed Up for User!",
            token
        });
    }catch(e) {
        console.log(e)
        return res.status(500).json({
            message: "Some Error Occurred!"
        });
    }
}






async function CheckIfUsernameExists(req, res) {
    
    try{
        let body = req.body;
        let username = body['username'];

        let theUpdatedUser = await Auth.findOne({"_id": username})
        if(theUpdatedUser){
            return res.status(403).json({
                message: "Username Already Exists"
            });
        }
        return res.status(201).json({
            message: "Username Does Not Exist"
        });
    }catch(e) {
        console.log(e)
        return res.status(500).json({
            message: "Some Error Occurred!"
        });
    }
}


module.exports = {  login, registerUser, CheckIfUsernameExists};
