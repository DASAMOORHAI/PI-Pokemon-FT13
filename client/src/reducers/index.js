import http from '../http-common.js';

const initialState = {
    allPoke: [],
    allPokeForUse: [],
    currPoke: [],
    infoPoke: {},
    ogOrNah: true,
    pageNum: 0,
    pageLimit: 0
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'PAGE_START':
            let pagePoke = action.payload.pokeInfo.slice(0, 12)

            return {
                ...state,
                allPoke: action.payload.pokeInfo,
                allPokeForUse: action.payload.pokeInfo,
                currPoke: pagePoke,
                pageLimit: action.payload.pageLimit
            }
        case 'ACT_FILTER':
            return {
                ...state,
                allPokeForUse: action.payload.tempAll,
                currPoke: action.payload.actPokes,
                pageNum: 0,
                pageLimit: action.payload.pageLimit,
                ogOrNah: true
            }
        case 'ACT_FILTER_CREATED':
            let newAllPoke = []
            console.log(action.payload)
            action.payload.tempAll.map(pokemon => {
                newAllPoke.push({
                    id: pokemon.id,
                    img: null,
                    name: pokemon.name,
                    types: [
                        {type: {name: pokemon.types[0].name}},
                        pokemon.types.length === 2 ? {type: {name: pokemon.types[1].name}} : null
                    ],
                    stats: [
                        {base_stat: pokemon.hp},
                        {base_stat: pokemon.attack},
                        {base_stat: pokemon.defense},
                        {base_stat: null},
                        {base_stat: null},
                        {base_stat: pokemon.speed}
                    ],
                    height: pokemon.height,
                    weight: pokemon.weight
                })
            })

            let actPokes2 = newAllPoke.slice(0, 12)

            return {
                ...state,
                allPokeForUse: newAllPoke,
                currPoke: actPokes2,
                pageLimit: action.payload.pageLimit,
                ogOrNah: false
            }
        case 'NEXT_PAGE':
            let next = state.pageNum + 1
            var nextPokes

            if(next > state.pageLimit) {
                return {
                    ...state
                }
            }
            
            nextPokes = state.allPokeForUse.slice(12 * next, 12 * (next + 1))

            return {
                ...state,
                currPoke: nextPokes,
                pageNum: next
            }
        case 'PREV_PAGE':
            let prev = state.pageNum - 1
            var prevPokes

            if(prev < 0) {
                return {
                    ...state
                }
            }

            prevPokes = state.allPokeForUse.slice(12 * prev, 12 * (prev + 1))

            return {
                ...state,
                currPoke: prevPokes,
                pageNum: prev
            }
        case 'SEARCH_NAME':
            return {
                ...state,
                currPoke: [action.payload],
                pageNum: 0,
                pageLimit: 0
            }
        case 'SEARCH_NAME_CREATED':
            return {
                ...state,
                currPoke: [action.payload],
                pageNum: 0,
                pageLimit: 0
            }
        case 'GET_POKE_INFO':
            return {
                ...state,
                infoPoke: action.payload
            }
        case 'GET_POKE_INFO_CREATED':
            let newPokeInfo = {
                id: action.payload.id,
                img: null,
                name: action.payload.name,
                types: [
                    {type: {name: action.payload.types[0].name}},
                    action.payload.types.length === 2 ? {type: {name: action.payload.types[1].name}} : null
                ],
                stats: [
                    {base_stat: action.payload.hp},
                    {base_stat: action.payload.attack},
                    {base_stat: action.payload.defense},
                    {base_stat: null},
                    {base_stat: null},
                    {base_stat: action.payload.speed}
                ],
                height: action.payload.height,
                weight: action.payload.weight
            }

            return {
                ...state,
                infoPoke: newPokeInfo
            }
        default:
            return {
                ...state,
            }
    }
}

export default rootReducer;

export async function asyncPageStartFetchThunk(dispatch) {
    let response = await http.get('/pokemons')
    let { pokeInfo, pageLimit } = response.data
    pokeInfo.sort(function (a, b) {
        if(a.name < b.name) {
            return -1
        }
        if(a.name > b.name) {
            return 1
        }
        return 0
    })

    dispatch({type: 'PAGE_START', payload: {pokeInfo, pageLimit}})
}

export function asyncGetPokemonInfo(id) {
    return async function asyncGetPokemonInfoThunk(dispatch, getState) {
        let state = getState()

        if(state.ogOrNah) {
            let response = await http.get(`/pokemons/${id}`)

            dispatch({type: 'GET_POKE_INFO', payload: response.data})
        } else {
            let response = await http.get(`/pokemons/created/${id}`)

            dispatch({type: 'GET_POKE_INFO_CREATED', payload: response.data})
        }
    }
}

export function asyncSearchByName(name, og) {
    return async function asyncSearchByNameThunk(dispatch) {
        if(og){
            try {
                let response = await http.get(`/pokemons?name=${name}`)

                dispatch({type: 'SEARCH_NAME', payload: response.data})
            } catch (error) {
                alert('Pokemon no encontrado')
            }
        } else {
            try {
                let response = await http.get(`/pokemons?name=${name}&createdPoke=1`)

                dispatch({type: 'SEARCH_NAME_CREATED', payload: response.data})
            } catch (error) {
                alert('Pokemon no encontrado')
            }
        }
    }
}

export function asyncFilterPokemon(obj) {
    return async function asyncFilterPokemonThunk(dispatch) {
        if(!obj.og) {
            let response = await http.get(`/pokemons/created?type=${obj.type}&sense=${obj.sense}&order=${obj.order}`)

            dispatch({type: 'ACT_FILTER_CREATED', payload: {tempAll: response.data.tempAll, pageLimit: response.data.pageLimit}})
        } else {
            let api = await http.get('/pokemons')
            var tempAll

            if(obj.type === 'all') {
                tempAll = api.data.pokeInfo.slice()
            } else {
                tempAll = api.data.pokeInfo.filter((pokemon) => {
                    for(let t of pokemon.types) {
                        if(t.type.name === obj.type) {
                            return pokemon;
                        }
                    }
                })
            }

            let count = tempAll.length

            if(count === 12) {
                count = count - 1
            }

            let pageLimit = Math.floor(count / 12)

            if(obj.sense === 'ASC') {
                if(obj.order === 'ABC') {
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
                if(obj.order === 'ABC') {
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

            let actPokes = tempAll.slice(0, 12)

            dispatch({type: 'ACT_FILTER', payload: {tempAll, actPokes, pageLimit}})
        }
    }
}