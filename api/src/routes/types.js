const router = require('express').Router();
const fetch = require("node-fetch");
const { Type } = require('../db.js')

var fetchCheck = false

router.get('/', async (req, res) => {
    if(fetchCheck === false) {
        await Type.sync({force: true})
        let api = fetch('https://pokeapi.co/api/v2/type')
        api = await api.json()
        for(i = 0; i < api.results.lenght; i++) {
            Type.create({
                name: api.results[i].name.charAt(0).toUpperCase() + api.results[i].name.slice(1)
            })
        }
        fetchCheck = true
    }
})

module.exports = router;