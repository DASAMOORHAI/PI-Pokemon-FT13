export function activateFilter(payload) {
    return {
        type: 'ACT_FILTER',
        payload
    }
}

export function nextPage() {
    return {
        type: 'NEXT_PAGE'
    }
}
export function prevPage() {
    return {
        type: 'PREV_PAGE'
    }
}

export function searchByName(payload) {
    return {
        type: 'SEARCH_NAME',
        payload
    }
}

export function getPokeInfo(payload) {
    return {
        type: 'GET_POKE_INFO',
        payload
    }
}