const {createUser, findUserByEmail} = require('../business/user.business');
const {format} = require('date-fns');
const md5 = require('md5');

// const createUserController = async (req, res)=>{
//     try{
//         const userExist =await findUserByEmail(req.body.email);
//         if(userExist){
//             res.status(400).send("User Already Exists!!!");
//         }
//         const userInfo = {
//             firstname : req.body.firstname,
//             lastname: req.body.lastname,
//             email: req.body.email,
//             password: md5(req.body.password),
//             createdat: format(new Date(), "yyyy/MM/dd  HH:mm")
//         }
//         const item = await createUser(userInfo);
//         res.status(201).json(item);
//      }catch(err){
//         // Log the error for debugging
//         console.error(err);

//         // Send a 500 Internal Server Error response
//         res.status(500).send("Internal Server Error");
//     }

// }

// module.exports = {
//     createUserController
// }


const createUserController = async (req, res) => {
    try {
        // Check if user already exists
        const userExist = await findUserByEmail(req.body.email);
        if (userExist) {
            return res.status(400).send("User Already Exists!!!");
        }

        // Prepare user info
        const userInfo = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: md5(req.body.password),
            createdat: format(new Date(), "yyyy/MM/dd HH:mm")
        };

        // Create new user
        const item = await createUser(userInfo);
        res.status(201).json(item); // Changed status code to 201 Created

    } catch (err) {
        // Log the error for debugging
        console.error(err);

        // Send a 500 Internal Server Error response
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { createUserController };
