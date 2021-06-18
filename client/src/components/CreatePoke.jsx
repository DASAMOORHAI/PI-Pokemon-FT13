import React, { useEffect, useState } from 'react';
import http from '../http-common.js';
import types from '../images/index.js';

const CreatePoke = () => {
    const [pokeName, setPokeName] = useState('')
    const [pvValue, setPvValue] = useState('')
    const [attValue, setAttValue] = useState('')
    const [defValue, setDefValue] = useState('')
    const [spdValue, setSpdValue] = useState('')
    const [hhtValue, setHhtValue] = useState('')
    const [whtValue, setWhtValue] = useState('')
    const [selTypes, setSelTypes] = useState([]) 
    const typesArr = Object.values(types)

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
                        .then(alert('Pokemon creado'))
                        .then(setSelTypes([]))
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
            <ul>
                {props.types.map(type =>
                    <li>
                        <img onClick={() => typeSelectHandleChange(type.id)} src={selTypes.includes(type.id) ? type.imgP : type.img}/>
                    </li>
                )}
            </ul>
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit} name='CreatePokeSubmit'>
                <label>
                    Nombre:
                    <input type='text' value={pokeName} name='pokeName' onChange={handleChange}/>
                </label>
                <label>
                    Tipos:
                    <TypeList types={typesArr}/>
                </label>
                <label>
                    PV:
                    <input type='text' value={pvValue} name='pvValue' onChange={handleChange}/> 
                </label>
                <label>
                    Fuerza:
                    <input type='text' value={attValue} name='attValue' onChange={handleChange}/>
                </label>
                <label>
                    Defensa:
                    <input type='text' value={defValue} name='defValue' onChange={handleChange}/>
                </label>
                <label>
                    Velocidad:
                    <input type='text' value={spdValue} name='spdValue' onChange={handleChange}/>
                </label>
                <label>
                    Altura:
                    <input type='text' value={hhtValue} name='hhtValue' onChange={handleChange}/>
                </label>
                <label>
                    Peso:
                    <input type='text' value={whtValue} name='whtValue' onChange={handleChange}/>
                </label>
                <input type='submit' value='Crear Pokemon'/>
            </form>
        </div>
    )
}

export default CreatePoke;