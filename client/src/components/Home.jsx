import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { nextPage, prevPage, activateFilter } from '../actions/index.js';
import { asyncSearchByName, asyncFilterPokemon } from '../reducers/index.js';
import { typePokeFilterFrontCycle, typePokeFilterBackCycle } from './HomeLongFuncs.js';
import imgs from '../images/index.js';
import noPokeImg from '../images/Home/NoPokemonImage.png';
import loadingImg from '../images/Home/LoadingPokeball.png';
import store from '../store.js';
import './Home.css';
import '../fonts/font.css';

const Home = ({currPoke, pageNum, pageLimit, nextPage, prevPage}) => {
    const [pokeName, setPokeName] = useState('')
    const [typePokeFilter, setTypePokeFilter] = useState('all');
    const [ogPoke, setOgPoke] = useState(true)
    const [orderSense, setOrderSense] = useState('ASC')
    const [orderBy, setOrderBy] = useState('ABC')
    const [loading, setLoading] = useState(false)

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

    async function handleSubmit(e) {
        e.preventDefault()
        switch(e.target.name) {
            case 'filterSubmit':
                setLoading(true)
                await store.dispatch(asyncFilterPokemon({
                    type: typePokeFilter,
                    sense: orderSense,
                    order: orderBy,
                    og: ogPoke
                }))
                setLoading(false)
                break;
            case 'searchNameSubmit':
                if(pokeName === '') {
                    alert('Se necesita escribir un nombre para buscar')
                } else {
                    setLoading(true)
                    await store.dispatch(asyncSearchByName(pokeName, ogPoke))
                    setPokeName('')
                    setLoading(false)
                }
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
                <ul id='pokeList'>
                    {props.pokemons.map(pokemon =>
                        <Link to={`/pokemon/info/${pokemon.id}`}>
                            <li className='pokeInList'>
                                <img className={!pokemon.img ? 'noPokeImg' : 'pokeImg'} src={!pokemon.img ? noPokeImg : pokemon.img} alt={pokemon.name}/>
                                <div className='pokeInListInfoCenterer'>
                                    <span className='pokeName'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
                                    <ul className='pokeTypesContainer'>
                                        <li><img src={imgs.types[pokemon.types[0].type.name].img} alt={pokemon.types[0].type.name}/></li>
                                        {pokemon.types.length === 2 && pokemon.types[1] !== null ? 
                                            <li><img src={imgs.types[pokemon.types[1].type.name].img} alt={pokemon.types[1].type.name}/></li> 
                                            : 
                                            null}
                                    </ul>
                                </div>
                            </li>
                        </Link>
                    )}
                </ul>
            )
        }
    }

    return (
        <div id='containerH'>
            <img id='homeLogo' src={imgs.home.logo}/>
            <button className='optionsBtn' id='optionsBtnOGPokeCustoms' onClick={handleChange} name='OGOrCreated'>{ogPoke ? 'Pokemones oficiales' : 'Pokemones creados'}</button>
            <form onSubmit={handleSubmit} name='searchNameSubmit'>
                <div className='searchContainer' id='searchContainerNameCustoms'>
                    <span className='searchIdentifier'>Nombre</span>
                    <input id='searchByNameInput' type='text' value={pokeName} name='searchPokeName' onChange={handleChange}/>
                    <input className='okBtn' type='submit' value='Buscar'/>
                </div>
            </form>
            <form onSubmit={handleSubmit} name='filterSubmit'>
                <div className='searchContainer' id='searchContainerFilterCustoms'>
                    <span className='searchIdentifier'>Filtro</span>
                    <img id='typeSelect' type='button' src={imgs.types[typePokeFilter].img} alt={typePokeFilter} onClick={handleChange} onAuxClick={handleChange} onContextMenu={(e)=> e.preventDefault()} name='typePokeFilter'/>
                    <button className='optionsBtn' type='button' onClick={handleChange} name='senseChange'>{orderSense}</button>
                    <button className='optionsBtn' type='button' onClick={handleChange} name='byChange'>{orderBy}</button>
                    <input className='okBtn' type='submit' value='Filtrar'/>
                </div>
            </form>
            <Link to='/pokemon/crear'>
                <button className='okBtn' id='okBtnCreatePokeCustoms'>Crear Pokemon</button>
            </Link>
            <div className='searchContainer' id='searchContainerPagesCustoms'>
                <button className='okBtn' onClick={() => prevPage()}>{'<<'}</button>
                <span id='pageIndicator'>{(pageNum + 1) + '/' + (pageLimit + 1)}</span>
                <button className='okBtn' onClick={() => nextPage()}>{'>>'}</button>
            </div>
            <img id='pokeballImg' src={imgs.home.fullPoke}/>
            <img id='pokeSignImg' src={imgs.home.pokeSign}/>
            <div id='pokeListContainer'>
                <PokeList pokemons={currPoke}/>
                <div id={loading ? 'loadingOn' : 'loadingOff'}>
                    <img src={loadingImg} id='loadingImg'/>
                    <span id='loadingText'>Buscando...</span>
                </div>
            </div>
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
    pageLimit: state.pageLimit,
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)