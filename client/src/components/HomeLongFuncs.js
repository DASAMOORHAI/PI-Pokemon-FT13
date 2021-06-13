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
            func('all')
            break;
        default:
            break;
    }        
}

export function typePokeFilterBackCycle(type, func) {
    switch(type) {
        case 'all':
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