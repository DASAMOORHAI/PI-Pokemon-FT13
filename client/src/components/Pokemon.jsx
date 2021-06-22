import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncGetPokemonInfo } from '../reducers/index.js';
import store from '../store.js';
import imgs from '../images/index.js';
import noPokeImg from '../images/Home/NoPokemonImage.png'
import './Pokemon.css';
import '../fonts/font.css';

const Pokemon = ({infoPoke}) => {
    let { idPokemon } = useParams()

    useEffect(() => {
        store.dispatch(asyncGetPokemonInfo(idPokemon));
    }, [])
    
    if(Object.keys(infoPoke).length === 0) {
        return (
            <div id='containerP'>
                <img id='pokeInfoSign' src={imgs.pokemon.pokeInfoSign}/>
                <span id='plsWait'>Por favor espere</span>
            </div>
        )
    } else {
        return (
            <div id='containerP'>
                <img id='pokeInfoSign' src={imgs.pokemon.pokeInfoSign}/>
                <img id='halfBallLeft' src={imgs.pokemon.halfBall}/>
                <img id='halfBallRight' src={imgs.pokemon.halfBall}/>
                <div id='middleBall'/>
                <div className='generalInfoContainer'>
                    <img className='pokeImgP' src={!infoPoke.img ? noPokeImg : infoPoke.img}/>
                    <div className='pokeNameCenterer'>
                        <span>{infoPoke.name.charAt(0).toUpperCase() + infoPoke.name.slice(1)}</span>
                    </div>
                    <span id='pokeId'>ID: {infoPoke.id}</span>
                    <span className='ht'>Altura: {!infoPoke.height ? '???' : infoPoke.height}</span>
                    <span className='wt'>Peso: {!infoPoke.weight ? '???' : infoPoke.weight}</span>
                    <ul className='pokeTypesContainer' id='pokeTypesContainerPokeCustom'>
                        <li><img src={imgs.types[infoPoke.types[0].type.name].img}/></li>
                        {infoPoke.types.length === 2 && infoPoke.types[1] !== null ? <li><img src={imgs.types[infoPoke.types[1].type.name].img}/></li> : null}
                    </ul>
                </div>
                <div className='detailedInfoContainer'>
                    <ul className='detailedInfo'>
                        <li>PV: {!infoPoke.stats[0].base_stat ? '???' : infoPoke.stats[0].base_stat}</li>
                        <li>Fuerza: {!infoPoke.stats[1].base_stat ? '???' : infoPoke.stats[1].base_stat}</li>
                        <li>Defensa: {!infoPoke.stats[2].base_stat ? '???' : infoPoke.stats[2].base_stat}</li>
                        <li>Velocidad: {!infoPoke.stats[5].base_stat ? '???' : infoPoke.stats[5].base_stat}</li>
                    </ul>
                </div>
                <Link to='/pokemon'>
                    <button className='okBtn' id='okBtnBackHomeCustoms'>Volver al Home</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    infoPoke: state.infoPoke
})

export default connect(mapStateToProps)(Pokemon);