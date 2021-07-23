const router = require('express').Router();
const fetch = require("node-fetch");
const { Op } = require("sequelize");
const { Pokemon, Type } = require('../db.js');

router.get('/', async (req, res) => {
    let { name, createdPoke } = req.query
    
    if(!name) {
        let pokeInfo = []

        let api = await fetch('https://pokeapi.co/api/v2/pokemon?&limit=40');
        api = await api.json();
        let apiBestBoi = await fetch('https://pokeapi.co/api/v2/pokemon/359')
        apiBestBoi = await apiBestBoi.json()

        const getPokeInfo = async (url) => {
            let pi = await fetch(url);
            pi = await pi.json();
            return pi;
        } 
        
        let arrayPoke = api.results.map(poke => getPokeInfo(poke.url))
        
        await Promise.all(arrayPoke)
            .then((response) => {
                for(let i = 0; i < response.length; i++) {
                    pokeInfo.push({
                        id: response[i].id,
                        img: response[i].sprites.front_default,
                        name: response[i].name,
                        types: response[i].types,
                        stats: response[i].stats,
                        height: response[i].height,
                        weight: response[i].height
                    })
                }
                pokeInfo.push({
                    id: apiBestBoi.id,
                    img: apiBestBoi.sprites.front_default,
                    name: apiBestBoi.name,
                    types: apiBestBoi.types,
                    stats: apiBestBoi.stats,
                    height: apiBestBoi.height,
                    weight: apiBestBoi.height
                })
                res.status(200).send({pokeInfo, pageLimit: 3})
            })
            .catch((error) => {
                res.sendStatus(400)
            })
    } else {
        if(createdPoke) {
            try {
                let response = await Pokemon.findOne({
                    include: Type,
                    where: {
                        name: {
                            [Op.iLike]: name
                        }
                    }
                })

                let pokeInfo = {
                    id: response.dataValues.id,
                    img: null,
                    name: response.dataValues.name,
                    types: [
                        {type: {name: response.dataValues.types[0].name}},
                        response.dataValues.types.length === 2 ? {type: {name: response.dataValues.types[1].name}} : null
                    ],
                    stats: [
                        {base_stat: response.dataValues.hp},
                        {base_stat: response.dataValues.attack},
                        {base_stat: response.dataValues.defense},
                        {base_stat: null},
                        {base_stat: null},
                        {base_stat: response.dataValues.speed}
                    ],
                    height: response.dataValues.height,
                    weight: response.dataValues.weight
                }

                res.status(200).send(pokeInfo)
            } catch (error) {
                res.sendStatus(400)
            }
        } else {
            try {
                let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                response = await response.json()

                let pokeInfo = {
                    id: response.id,
                    img: response.sprites.front_default,
                    name: response.name,
                    types: response.types,
                    stats: response.stats,
                    height: response.height,
                    weight: response.height
                }

                res.status(200).send(pokeInfo)
            } catch (error) {
                res.sendStatus(400)
            }
        }
    }
})

router.get('/created', async (req, res) => {
    let { type, sense, order } = req.query

    let tempAll = []
    
    let r = await Pokemon.findAll({
        include: Type,
    })

    if(type === 'all') {
        for(let i = 0; i < r.length; i++) {
            tempAll.push(r[i].dataValues)
        }
    } else {
        for(let i = 0; i < r.length; i++) {
            for(let j = 0; j < r[i].dataValues.types.length; j++) {
                if(r[i].dataValues.types[j].dataValues.name === type) {
                    tempAll.push(r[i].dataValues)
                }
            }
        }
    }
    let count = tempAll.length

    if(count === 12) {
        count = count - 1
    }

    let pageLimit = Math.floor(count / 12)

    if(sense === 'ASC') {
        if(order === 'ABC') {
            tempAll.sort(function (a, b) {
                if(a.name < b.name) {
                    return -1
                }
                if(a.name > b.name) {
                    return 1
                }
                return 0
            })
        } else {
            tempAll.sort(function (a, b) {
                if(a.stats[1].base_stat < b.stats[1].base_stat) {
                    return -1
                }
                if(a.stats[1].base_stat > b.stats[1].base_stat) {
                    return 1
                }
                return 0
            })
        }
    } else {
        if(order === 'ABC') {
            tempAll.sort(function (a, b) {
                if(a.name < b.name) {
                    return 1
                }
                if(a.name > b.name) {
                    return -1
                }
                return 0
            })
        } else {
            tempAll.sort(function (a, b) {
                if(a.stats[1].base_stat < b.stats[1].base_stat) {
                    return 1
                }
                if(a.stats[1].base_stat > b.stats[1].base_stat) {
                    return -1
                }
                return 0
            })
        }
    }

    res.status(200).send({tempAll, pageLimit})
})

router.post('/', async (req, res) => {
    let createdCheck = await Pokemon.findOne({
        where: {
            name: {
                [Op.iLike]: req.query.name
            }
        }
    })

    if(createdCheck) {
        res.sendStatus(400)
    } else {
        for(let i in req.query) {
            if(!req.query[i]) {
                req.query[i] = null
            } else if(i !== 'name' & i !== 'types') {
                req.query[i] = Number(req.query[i])
            }
        }
        
        let tempPokeTypesId = req.query.types.split(',')
        let arrPokeTypesId = tempPokeTypesId.map(id => Number(id))
        let dbPokeTypes = await Type.findAll({
            where: {
                id: {
                    [Op.or]: arrPokeTypesId
                }
            }
        })

        await Pokemon.sync()
        let newPoke = await Pokemon.create({
            name: req.query.name,
            hp: req.query.pv,
            attack: req.query.att,
            defense: req.query.def,
            speed: req.query.spd,
            height: req.query.hht,
            weight: req.query.wht
        })

        newPoke.setTypes(dbPokeTypes)

        res.sendStatus(200)
    }
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

router.get('/created/:idPokemon', async (req, res) => {
    const { idPokemon } = req.params

    let searchId = Number(idPokemon)

    let infoPoke = await Pokemon.findOne({
        include: Type,
        where: {
            id: searchId
        }
    })

    res.status(200).send(infoPoke)
})


module.exports = router;