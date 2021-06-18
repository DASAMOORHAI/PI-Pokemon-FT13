export function typePokeFilterFrontCycle(type, func) {
    switch(type) {
        case 'all':
            func('grass')
            break;
        case 'grass':
            func('poison')
            break;
        case 'poison':
            func('fire')
            break;
        case 'fire':
            func('flying')
            break;
        case 'flying':
            func('water')
            break;
        case 'water':
            func('bug')
            break;
        case 'bug':
            func('normal')
            break;
        case 'normal':
            func('electric')
            break;
        case 'electric':
            func('ground')
            break;
        case 'ground':
            func('fairy')
            break;
        case 'fairy':
            func('dark')
            break;
        case 'dark':
            func('fighting')
            break;
        case 'fighting':
            func('rock')
            break;
        case 'rock':
            func('ghost')
            break;
        case 'ghost':
            func('steel')
            break;
        case 'steel':
            func('psychic')
            break;
        case 'psychic':
            func('ice')
            break;
        case 'ice':
            func('dragon')
            break;
        case 'dragon':
            func('unknown')
            break;
        case 'unknown':
            func('shadow')
            break;
        case 'shadow':
            func('all')
            break;
        default:
            break;
    }        
}

export function typePokeFilterBackCycle(type, func) {
    switch(type) {
        case 'all':
            func('shadow')
            break;
        case 'shadow':
            func('unknown')
            break;
        case 'unknown':
            func('dragon')
            break;
        case 'dragon':
            func('ice')
            break;
        case 'ice':
            func('psychic')
            break;
        case 'psychic':
            func('steel')
        case 'steel':
            func('ghost')
            break;
        case 'ghost':
            func('rock')
            break;
        case 'rock':
            func('fighting')
            break;
        case 'fighting':
            func('dark')
            break;
        case 'dark':
            func('fairy')
            break;
        case 'fairy':
            func('ground')
            break;
        case 'ground':
            func('electric')
            break;
        case 'electric':
            func('normal')
            break;
        case 'normal':
            func('bug')
            break;
        case 'bug':
            func('water')
            break;
        case 'water':
            func('flying')
            break;
        case 'flying':
            func('fire')
            break;
        case 'fire':
            func('poison')
            break;
        case 'poison':
            func('grass')
            break;
        case 'grass':
            func('all')
            break;
        default:
            break;
    }
}