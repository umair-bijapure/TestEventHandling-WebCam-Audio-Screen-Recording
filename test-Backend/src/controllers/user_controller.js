const User = require('..//adapters/user');



async function getallUsers(req, res) {
    console.log("is it hereeee get all users")
    try{
        const allUsers = await User.find({});
        return res.json(allUsers);
    }
    catch {
        return res.status(500).json({
            message: "Some Error Occurred!"
        });
    }

}

async function getUser(req, res) {
    console.log("is it hereeee get user")
    try{
        const theUser = await User.findOne({_id: req.params.username});
        if(theUser){
            return res.json(theUser);
        }
        return res.status(404).json({
            messsage: "User does not exist"
        })
    }
    catch {
        return res.status(500).json({
            message: "Some Error Occurred!"
        });
    }

}

async function updateUser(req, res) {
    console.log("is it hereeee update")
    try{
        const body = req.body;
        const theUser = await User.findOne({_id: req.params.username});
        if(theUser){
            const updateUser = await User.findOneAndUpdate({_id: req.params.username}, body);
            // TODO: Add a Token Here
            return res.status(201).json({
                message: "Updated Successfully!"
            })
        }
        return res.status(404).json({
            messsage: "User does not exist"
        })
    }
    catch {
        return res.status(500).json({
            message: "Some Error Occurred!"
        });
    }

}

module.exports = { getUser,getallUsers,updateUser};