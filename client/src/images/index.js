import bug from './types/bug.jpg';
import bugP from './types/bugPressed.jpg';
import dark from './types/dark.jpg';
import darkP from './types/darkPressed.jpg';
import dragon from './types/dragon.jpg';
import dragonP from './types/dragonPressed.jpg';
import electric from './types/electric.jpg';
import electricP from './types/electricPressed.jpg';
import fairy from './types/fairy.jpg';
import fairyP from './types/fairyPressed.jpg';
import fighting from './types/fighting.jpg';
import fightingP from './types/fightingPressed.jpg';
import fire from './types/fire.jpg';
import fireP from './types/firePressed.jpg';
import flying from './types/flying.jpg';
import flyingP from './types/flyingPressed.jpg';
import ghost from './types/ghost.jpg';
import ghostP from './types/ghostPressed.jpg';
import grass from './types/grass.jpg';
import grassP from './types/grassPressed.jpg'
import ground from './types/ground.jpg';
import groundP from './types/groundPressed.jpg';
import ice from './types/ice.jpg';
import iceP from './types/icePressed.jpg';
import normal from './types/normal.jpg';
import normalP from './types/normalPressed.jpg';
import poison from './types/poison.jpg';
import poisonP from './types/poisonPressed.jpg';
import psychic from './types/psychic.jpg';
import psychicP from './types/psychicPressed.jpg';
import rock from './types/rock.jpg';
import rockP from './types/rockPressed.jpg';
import shadow from './types/shadow.jpg';
import shadowP from './types/shadowPressed.jpg';
import steel from './types/steel.jpg';
import steelP from './types/steelPressed.jpg';
import unknown from './types/unknown.jpg';
import unknownP from './types/unknownPressed.jpg';
import water from './types/water.jpg';
import waterP from './types/waterPressed.jpg';
import all from './types/all.jpg';
import fullPokeball from './Home/FullPokeball.png';
import pokemonSign from './Home/PokemonSign.png';
import henryPokeLogo from './Home/HenryPokemonLogo.png';
import pokemonInfoGeneral from './Pokemon/PokemonInfoGeneral.png';
import pokemonInfoDetails from './Pokemon/PokemonInfoDetails.png';
import halfPokeball from './Pokemon/HalfPokeball.png';
import pokeInfoSign from './Pokemon/PokemonInfoSign.jpg';

export default {
    types: {
        normal: {img: normal, imgP: normalP, id: 1},
        fighting: {img: fighting, imgP: fightingP, id: 2},
        flying: {img: flying, imgP: flyingP, id: 3},
        poison: {img: poison, imgP: poisonP, id: 4},
        ground: {img: ground, imgP: groundP, id: 5},
        rock: {img: rock, imgP: rockP, id: 6},
        bug: {img: bug, imgP: bugP, id: 7},
        ghost: {img: ghost, imgP: ghostP, id: 8},
        steel: {img: steel, imgP: steelP, id: 9},
        fire: {img: fire, imgP: fireP, id: 10},
        water: {img: water, imgP: waterP, id: 11},
        grass: {img: grass, imgP: grassP, id: 12},
        electric: {img: electric, imgP: electricP, id: 13},
        psychic: {img: psychic, imgP: psychicP, id: 14},
        ice: {img: ice, imgP: iceP, id: 15},
        dragon: {img: dragon, imgP: dragonP, id: 16},
        dark: {img: dark, imgP: darkP, id: 17},
        fairy: {img: fairy, imgP: fairyP, id: 18},
        unknown: {img: unknown, imgP: unknownP, id: 19},
        shadow: {img: shadow, imgP: shadowP, id: 20},
        all: {img: all}
    },
    typesById: {
        1: {img: normal, imgP: normalP, id: 1},
        2: {img: fighting, imgP: fightingP, id: 2},
        3: {img: flying, imgP: flyingP, id:3},
        4: {img: poison, imgP: poisonP, id: 4},
        5: {img: ground, imgP: groundP, id: 5},
        6: {img: rock, imgP: rockP, id: 6},
        7: {img: bug, imgP: bugP, id: 7},
        8: {img: ghost, imgP: ghostP, id: 8},
        9: {img: steel, imgP: steelP, id: 9},
        10: {img: fire, imgP: fireP, id: 10},
        11: {img: water, imgP: waterP, id: 11},
        12: {img: grass, imgP: grassP, id: 12},
        13: {img: electric, imgP: electricP, id: 13},
        14: {img: psychic, imgP: psychicP, id: 14},
        15: {img: ice, imgP: iceP, id: 15},
        16: {img: dragon, imgP: dragonP, id: 16},
        17: {img: dark, imgP: darkP, id: 17},
        18: {img: fairy, imgP: fairyP, id: 18},
        19: {img: unknown, imgP: unknownP, id: 19},
        20: {img: shadow, imgP: shadowP, id: 20},
    },
    home: {
        fullPoke: fullPokeball,
        pokeSign: pokemonSign,
        logo: henryPokeLogo
    },
    pokemon: {
        pokeInfoG: pokemonInfoGeneral,
        pokeInfoD: pokemonInfoDetails,
        halfBall: halfPokeball,
        fullPoke: fullPokeball,
        pokeInfoSign: pokeInfoSign
    }
}