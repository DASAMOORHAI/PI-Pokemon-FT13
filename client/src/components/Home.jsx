import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { nextPage, prevPage, activateFilter } from '../actions/index.js';
import { asyncSearchByName, asyncFilterPokemon } from '../reducers/index.js';
import { typePokeFilterFrontCycle, typePokeFilterBackCycle } from './HomeLongFuncs.js';
import store from '../store.js';

const Home = ({currPoke, pageNum, pageLimit, nextPage, prevPage, actFilter}) => {
    const [pokeName, setPokeName] = useState('')
    const [typePokeFilter, setTypePokeFilter] = useState('all');
    const [ogPoke, setOgPoke] = useState(true)
    const [orderSense, setOrderSense] = useState('ASC')
    const [orderBy, setOrderBy] = useState('ABC')

    function handleChange(e) {
        switch(e.target.name) {
            case 'typePokeFilter':
                if(e.button === 0) {
                    typePokeFilterFrontCycle(typePokeFilter, setTypePokeFilter)
                } else if (e.button === 2) {
                    typePokeFilterBackCycle(typePokeFilter, setTypePokeFilter)
                }
                break;
            case 'OGOrCreated':
                if(ogPoke) {
                    setOgPoke(false)
                } else {
                    setOgPoke(true)
                }
                break;
            case 'senseChange':
                if(orderSense === 'ASC') {
                    setOrderSense('DES')
                } else {
                    setOrderSense('ASC')
                }
                break;
            case 'byChange':
                if(orderBy === 'ABC') {
                    setOrderBy('Fuerza')
                } else {
                    setOrderBy('ABC')
                }
                break;
            case 'searchPokeName':
                setPokeName(e.target.value)
                break;
            default:
                break;
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        switch(e.target.name) {
            case 'filterSubmit':
                store.dispatch(asyncFilterPokemon({
                    type: typePokeFilter,
                    sense: orderSense,
                    order: orderBy,
                    og: ogPoke
                }))
                break;
            case 'searchNameSubmit':
                store.dispatch(asyncSearchByName(pokeName, ogPoke))
                setPokeName('')
                break;
            default:
                break;
        }
    }

    function PokeList(props) {
        if(!props.pokemons) {
            return <span>Por favor espere</span>
        } else {
            return (
                <ul>
                    {props.pokemons.map(pokemon =>
                        <Link to={`/pokemon/info/${pokemon.id}`}>
                            <li>
                                <img src={pokemon.img} />
                                <span>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
                                <ul>
                                    <li>{pokemon.types[0].type.name}</li>
                                    {pokemon.types.length === 2 && pokemon.types[1] !== null ? <li>{pokemon.types[1].type.name}</li> : null}
                                </ul>
                            </li>
                        </Link>
                    )}
                </ul>
            )
        }
    }

    return (
        <div>
            <button onClick={handleChange} name='OGOrCreated'>{ogPoke ? 'Pokemones oficiales' : 'Pokemones creados'}</button>
            <form onSubmit={handleSubmit} name='searchNameSubmit'>
                <label>
                    <input type='text' value={pokeName} name='searchPokeName' onChange={handleChange}/>
                </label>
                <input type='submit' value='Buscar'/>
            </form>
            <form onSubmit={handleSubmit} name='filterSubmit'>
                <label>
                    <button type='button' onClick={handleChange} onAuxClick={handleChange} onContextMenu={(e)=> e.preventDefault()} name='typePokeFilter'>{typePokeFilter}</button>
                    <button type='button' onClick={handleChange} name='senseChange'>{orderSense}</button>
                    <button type='button' onClick={handleChange} name='byChange'>{orderBy}</button>
                </label>
                <input type='submit' value='Filtrar'/>
            </form>
            <button onClick={() => prevPage()}>{'<<'}</button>
            <span>{(pageNum + 1) + '/' + (pageLimit + 1)}</span>
            <button onClick={() => nextPage()}>{'>>'}</button>
            <Link to='/pokemon/crear'>
                <button>Crear Pokemon</button>
            </Link>
            <PokeList pokemons={currPoke}/>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        nextPage: function() {
            dispatch(nextPage())
        },
        prevPage: function() {
            dispatch(prevPage())
        },
        actFilter: function(payload) {
            dispatch(activateFilter(payload))
        }
    }
}

const mapStateToProps = (state) => ({
    currPoke: state.currPoke,
    pageNum: state.pageNum,
    pageLimit: state.pageLimit
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)