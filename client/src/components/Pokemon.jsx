import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { getPokeInfo } from '../actions/index.js';

const Pokemon = ({infoPoke, getPokeInfo}) => {
    let { idPokemon } = useParams()

    useEffect(() => {
        getPokeInfo(idPokemon);
    }, [])
    
    if(Object.keys(infoPoke).length === 0) {
        return <span>Por favor espere</span>
    } else {
        return (
            <div>
                <img src={infoPoke.img}/>
                <p>{infoPoke.name.charAt(0).toUpperCase() + infoPoke.name.slice(1)}</p> 
                <ul>
                    <li>{infoPoke.types[0].type.name}</li>
                    {infoPoke.types.length === 2 ? <li>{infoPoke.types[1].type.name}</li> : null}
                </ul>
                <p>ID: {infoPoke.id}</p>
                <ul>
                    <li>PV: {infoPoke.stats[0].base_stat}</li>
                    <li>Fuerza: {infoPoke.stats[1].base_stat}</li>
                    <li>Defensa: {infoPoke.stats[2].base_stat}</li>
                    <li>Velocidad: {infoPoke.stats[5].base_stat}</li>
                </ul>
                <p>Altura: {infoPoke.height}</p>
                <p>Peso: {infoPoke.weight}</p>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPokeInfo: function(payload) {
            dispatch(getPokeInfo(payload))
        }
    }
}

const mapStateToProps = (state) => ({
    infoPoke: state.infoPoke
})

export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);