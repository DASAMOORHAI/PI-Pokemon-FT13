const router = require('express').Router();
const fetch = require("node-fetch");

router.get('/', async (req, res) => {
    let { name } = req.query

    if(name) {
        try {
            let api = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            api = await api.json()

            res.status(200).send(api)
        } catch (error) {
            res.sendStatus(404)
        }
    } else {
        let pokeInfo = []
        let api = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
        api = await api.json()

        for(i = 0; i < api.results.length; i++) {
            let p = await fetch(api.results[i].url)
            p = await p.json()
            pokeInfo.push({
                img: p.sprites.front_default, 
                name: p.name.charAt(0).toUpperCase() + p.name.slice(1), 
                types: p.types
            })
        }

        res.status(200).send(pokeInfo)
    }
})

router.post('/', async (req, res) => {
    // hacer despues
})

router.get('/:idPokemon', async (req, res) => {
    const { idPokemon } = req.params

    try {
        let api = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
        api = await api.json()
        let pokeInfo = {
            img: api.sprites.front_default,
            name: api.name.charAt(0).toUpperCase() + api.name.slice(1),
            types: api.types,
            id: api.id,
            stats: api.stats,
            weight: api.weight,
            height: api.height
        }

        res.status(200).send(pokeInfo)
    } catch (error) {
        res.sendStatus(404)
    }
})

module.exports = router;