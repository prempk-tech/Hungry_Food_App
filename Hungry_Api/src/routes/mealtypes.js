const express = require('express');

const mealtypeModel = require('../models/mealtypes');

const router = express.Router()



// router.post('/addMealtypes', async (req, res) => {
//     let mealtypereqData = req.body;
//     const data = new mealtypeModel({
//         name: mealtypereqData.name,
//         content: mealtypereqData.content,
//         image: mealtypereqData.image,
//         meal_type: mealtypereqData.meal_type
//     })
//     console.log(data)
//     try {
//         let mealtypedata = await data.save();
//         res.status(200).json({ "status": 200, "data": mealtypedata, "message": "Added Successfully", "error": false })
//     }
//     catch (error) {
//         res.status(400).json({ "status": 400, "message": error.message, "error": true })
//     }
// })



router.get('/getAllMealTypes', async (req, res) => {
    try {
        const mealtypedata = await mealtypeModel.find();
        res.status(200).json({ "status": 200, "data": mealtypedata, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

module.exports = router;