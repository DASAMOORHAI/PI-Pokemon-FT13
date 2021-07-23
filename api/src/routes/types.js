const router = require('express').Router();
const fetch = require("node-fetch");
const { Type } = require('../db.js')

router.get('/', async (req, res) => {
        await Type.sync({force: true})
        let api = await fetch('https://pokeapi.co/api/v2/type')
        api = await api.json()
        for(i = 0; i < api.results.length; i++) {
            await Type.create({
                name: api.results[i].name
            })
        }
})

module.exports = router;