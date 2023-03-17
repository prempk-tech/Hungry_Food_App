const express = require('express');   //important
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const saltRounds = 10;
var privateKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdPUs9lNWuMjO7nbFQjfrg7pCREVHmL29NTTsXU6gDfpE7C/KPo6wiICEvWweEhwHWJoSnjZV62bPdyRLBuavfLFWg0ka3R9DsumCtRA/RZe15GOBz+XrrMk+79/6GCUKz/HlBEWplqZ5Lr2ewVVUuSoaOvZH/B7wTiYlifCQAIQIDAQAB"


const router = express.Router();

router.post('/register', async (req, res) => {
    try {

        var reqData = req.body;

        if (Object.keys(reqData).length === 0) {
            throw new Error("poda");
        }

        const ExistingEmail = await UserModel.findOne({ user_email: reqData.user_email }).countDocuments();

        if (ExistingEmail) {
            throw new Error("Email already exist.")
        }

        const enpPassword = bcrypt.hashSync(reqData.user_password, saltRounds);

        delete reqData.user_password;
        var token = jwt.sign(reqData, privateKey)
        var user = 'userid-' + uuidv4();
        console.log(user);

        const userData = new UserModel({
            user_id: user,
            user_first_name: reqData.user_first_name,
            user_last_name: reqData.user_last_name,
            user_email: reqData.user_email,
            user_password: enpPassword,
            user_status: 1,
            user_token: token,
            user_timestamp: new Date().getTime()
        })

        var result = await userData.save();

        res.status(200).json({ "status": 200, data: result, "message": "registered successfully", "error": false })
    } catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

router.post('/login', async (req, res) => {
    try {

        var reqData = req.body;

        if (Object.keys(reqData).length === 0) {
            throw new Error("please provide data.");
        }

        const ExistingEmail = await UserModel.findOne({ user_email: reqData.user_email }).countDocuments();

        if (ExistingEmail) {

            var userData = await UserModel.findOne({ user_email: reqData.user_email });
            const depPassword = bcrypt.compareSync(reqData.user_password, userData.user_password);
            console.log(userData)
            if (depPassword) {
                delete userData.user_password;
                var token = jwt.sign({ userData }, privateKey)
                userData.user_token = token;

                await UserModel.findOneAndUpdate({ user_email: reqData.user_email }, { user_token: token });
                res.status(200).json({ "status": 200, "data": userData, "message": "Login successfully", "error": false })

            } else {
                throw new Error("password not matched..")
            }

        } else {
            throw new Error("Email already exist.")
        }


    } catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

async function encrypt(user_password) {
    await bcrypt.hash(user_password, saltRounds, function (err, hash) {
        console.log(hash)
        return hash
    });
}

module.exports = router;