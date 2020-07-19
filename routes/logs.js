const express = require('express')
const router = express.Router();
const Log = require('../Models/LogModel')


router.get('/', async (req, res) => {
    try {
        const logs = await Log.find({message: /\w/g });
                res.json(logs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

router.post('/', async (req, res) => {
  
    const { message, attention, tech, date } = req.body;

    try {
        const newLog = new Log({
            message,
            attention,
            tech,
            date
        });

        const logs = await newLog.save();
        res.json(logs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});

router.put('/:id', async (req, res) => {
    const{ message, attention, tech, date } = req.body;
    //Build contact object

    const logFields = {
        message,
        attention,
        tech,
        date
    };

    try {
        let log = await Log.findOne({ _id: req.params.id });

        if(!log) return res.status(400).json({ msg: 'Log not found' });
        log = await Log.findByIdAndUpdate(req.params.id, { $set: logFields }, { new: true });
        res.json(log);
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let log = await Log.findById(req.params.id);

        if(!log) return res.status(400).json({ msg: 'Log not found' });

        await Log.findByIdAndRemove(req.params.id)
        res.send('Log Removed');

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


module.exports = router;