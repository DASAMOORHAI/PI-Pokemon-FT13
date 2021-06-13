import http from '../http-common.js';

const initialState = {
    allPoke: [],
    allPokeForUse: [],
    currPoke: [],
    infoPoke: {},
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
            var tempAll
            if(action.payload.type === 'all') {
                tempAll = state.allPoke.slice()
            } else {
                tempAll = state.allPoke.filter((pokemon) => {
                    for(let t of pokemon.types) {
                        if(t.type.name === action.payload.type) {
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

            if(action.payload.sense === 'ASC') {
                if(action.payload.order === 'ABC') {
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
                if(action.payload.order === 'ABC') {
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

            return {
                ...state,
                allPokeForUse: tempAll,
                currPoke: actPokes,
                pageNum: 0,
                pageLimit: pageLimit
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
            let pokeFound = state.allPoke.find((pokemon) => pokemon.name.toLowerCase() === action.payload.toLowerCase())

            if(!pokeFound) {
                alert('Pokemon no encontrado')
                return {
                    ...state
                }
            } else {
                return {
                    ...state,
                    allPokeForUse: [pokeFound],
                    currPoke: [pokeFound],
                    pageNum: 0,
                    pageLimit: 0
                }
            }
        case 'GET_POKE_INFO':
            let pokeFind = state.allPoke.find((pokemon) => pokemon.id === Number(action.payload))

            return {
                ...state,
                infoPoke: pokeFind
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