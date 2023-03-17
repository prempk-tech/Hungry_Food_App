const express = require('express');   //important
const LocationModel = require('../models/location');

const router = express.Router()       //important

//Post Method
router.post('/addLocation', async (req, res) => {
    const requestData = req.body;
    const data = new LocationModel({
        name: requestData.name,
        city_id: requestData.city_id,
        location_id: requestData.location_id,
        city: requestData.city,
        country_name: requestData.country_name
    })
    try {
        const locationData = await data.save();
        res.status(200).json({ "status": 200, "data": locationData, "message": "Added Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

//Get all Method
router.get('/getLocation', async (req, res) => {
    try {
        const data = await LocationModel.find();
        res.status(200).json({ "status": 200, "data": data, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})


module.exports = router;   //important