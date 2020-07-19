const express = require('express')
const router = express.Router();
const Tech = require('../Models/TechModel')


router.get('/', async (req, res) => {
    try {
        const techs = await Tech.find({firstName: /\w/g });
            res.json(techs)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

router.post('/', async (req, res) => {
  
    const { firstName, lastName } = req.body;

    try {
        const newTech = new Tech({
            firstName,
            lastName
        });

        const techs = await newTech.save();
        res.send(techs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});

router.delete('/:id', async (req, res) => {
    
    try {
        let tech = await Tech.findById(req.params.id);

        if(!tech) return res.status(400).json({ msg: 'Tech not found' });
        await Tech.findByIdAndRemove(req.params.id)
        res.send('Tech Removed');

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


module.exports = router;