import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../http-common.js';
import imgs from '../images/index.js';
import noPokeImg from '../images/Home/NoPokemonImage.png';
import './CreatePoke.css';
import '../fonts/font.css';

const CreatePoke = () => {
    const [pokeName, setPokeName] = useState('')
    const [pvValue, setPvValue] = useState('')
    const [attValue, setAttValue] = useState('')
    const [defValue, setDefValue] = useState('')
    const [spdValue, setSpdValue] = useState('')
    const [hhtValue, setHhtValue] = useState('')
    const [whtValue, setWhtValue] = useState('')
    const [selTypes, setSelTypes] = useState([]) 
    const typesArr = Object.values(imgs.typesById)

    function handleChange(e) {
        switch(e.target.name) {
            case  'pokeName':
                setPokeName(e.target.value)
                break;
            case 'pvValue':
                setPvValue(e.target.value)
                break;
            case 'attValue':
                setAttValue(e.target.value)
                break;
            case 'defValue':
                setDefValue(e.target.value)
                break;
            case 'spdValue':
                setSpdValue(e.target.value)
                break;
            case 'hhtValue':
                setHhtValue(e.target.value)
                break;
            case 'whtValue':
                setWhtValue(e.target.value)
                break;
            default:
                break;
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        switch(e.target.name) {
            case 'CreatePokeSubmit':
                if(!pokeName) {
                    alert('El pokemon necesita un nombre')
                } else if(selTypes.length === 0) {
                    alert('El pokemon necesita mínimo un tipo')
                } else {
                    http.post(`/pokemons?name=${pokeName}&types=${selTypes}&pv=${pvValue}&att=${attValue}&def=${defValue}&spd=${spdValue}&hht=${hhtValue}&wht=${whtValue}`)
                        .then(() => alert('Pokemon creado'))
                        .then(() => setSelTypes([]))
                        .catch((error) => {
                            alert('No puede haber dos pokemones con el mismo nombre')
                        })
                }
                break;
            default:
                break;
        }
    }

    function typeSelectHandleChange(id) {
        let res = selTypes.find(idType => idType === id)

        if(res) {
            setSelTypes(selTypes.filter(idType => idType !== id))
        } else {
            if(selTypes.length === 2) {
                alert('El pokemon no puede tener más de dos tipos')
            } else {
                setSelTypes([...selTypes, id])
            }
        }
    }

    function TypeList(props) {
        return (
            <ul id='typeSelector'>
                {props.types.map(type =>
                    <li className='types'>
                        <img onClick={() => typeSelectHandleChange(type.id)} src={selTypes.includes(type.id) ? type.imgP : type.img}/>
                    </li>
                )}
            </ul>
        )
    }

    return (
        <div id='containerCP'>
            <form id='formContainer' onSubmit={handleSubmit} name='CreatePokeSubmit'>
                <div className='searchContainerCP' id='searchContainerCPNameCustoms'>
                    <span className='searchIdentifierCP'>Nombre</span>
                    <input className='searchInputCP' type='text' value={pokeName} name='pokeName' onChange={handleChange}/>
                </div>
                <div className='searchContainerCP' id='searchContainerCPTypesCustoms'>
                    <span className='searchIdentifierCP'>Tipos</span>
                    <div id='typeSelectorContainer'>
                        <TypeList types={typesArr}/>
                    </div>
                </div>
                <div id='statsContainerCP'>
                    <div className='searchContainerCP searchContainerCPStatsCustoms'>
                        <span className='searchIdentifierCP'>Altura</span>
                        <input className='searchInputCP searchInputCPStatsCustoms' type='text' value={hhtValue} name='hhtValue' onChange={handleChange}/>
                    </div>
                    <div className='searchContainerCP searchContainerCPStatsCustoms'>
                        <span className='searchIdentifierCP'>Peso</span>
                        <input className='searchInputCP searchInputCPStatsCustoms' type='text' value={whtValue} name='whtValue' onChange={handleChange}/>
                    </div>
                    <div className='searchContainerCP searchContainerCPStatsCustoms'>
                        <span className='searchIdentifierCP'>PV</span>
                        <input className='searchInputCP searchInputCPStatsCustoms' type='text' value={pvValue} name='pvValue' onChange={handleChange}/> 
                    </div>
                    <div className='searchContainerCP searchContainerCPStatsCustoms'>
                        <span className='searchIdentifierCP'>Fuerza</span>
                        <input className='searchInputCP searchInputCPStatsCustoms' type='text' value={attValue} name='attValue' onChange={handleChange}/>
                    </div>
                    <div className='searchContainerCP searchContainerCPStatsCustoms'>
                        <span className='searchIdentifierCP'>Defensa</span>
                        <input className='searchInputCP searchInputCPStatsCustoms' type='text' value={defValue} name='defValue' onChange={handleChange}/>
                    </div>
                    <div className='searchContainerCP searchContainerCPStatsCustoms'>
                        <span className='searchIdentifierCP'>Velocidad</span>
                        <input className='searchInputCP searchInputCPStatsCustoms' type='text' value={spdValue} name='spdValue' onChange={handleChange}/>
                    </div>
                </div>
                <input className='okBtn' id='okBtnCPCreateBtnCustoms' type='submit' value='Crear Pokemon'/>
            </form>
            <div className='generalInfoContainer' id='generalInfoContainerCreatePokeCustoms'>
                    <img className='pokeImg' id='pokeImgCreatePokeCustoms' src={noPokeImg}/>
                    <div className='pokeNameCenterer' id='pokeNameCentererCPCustoms'>
                        <span>{pokeName}</span>
                    </div>
                    <span className='ht' id='htCreatePokeCustoms'>Altura: {!hhtValue ? '???' : hhtValue}</span>
                    <span className='wt' id='wtCreatePokeCustoms'>Peso: {!whtValue ? '???' : whtValue}</span>
                    <ul className='pokeTypesContainer' id='pokeTypesContainerCreatePokeCustom'>
                        {selTypes.length >= 1 ? <li><img src={imgs.typesById[selTypes[0]].img}/></li> : null}
                        {selTypes.length === 2 ? <li><img src={imgs.typesById[selTypes[1]].img}/></li> : null}
                    </ul>
                </div>
                <div className='detailedInfoContainer' id='detailedInfoContainerCreatePokeCustoms'>
                    <ul className='detailedInfo' id='detailedInfoCreatePokeCustoms'>
                        <li>PV: {!pvValue ? '???' : pvValue}</li>
                        <li>Fuerza: {!attValue ? '???' : attValue}</li>
                        <li>Defensa: {!defValue ? '???' : defValue}</li>
                        <li>Velocidad: {!spdValue ? '???' : spdValue}</li>
                    </ul>
                </div>
                <Link to='/pokemon'>
                    <button className='okBtn' id='okBtnBackCPCustoms'>Volver al Home</button>
                </Link>
        </div>
    )
}

export default CreatePoke;