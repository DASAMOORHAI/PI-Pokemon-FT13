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