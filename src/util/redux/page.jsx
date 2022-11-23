const _SETPAGE = "page/_SETPAGE"

export function setPage(inputData) {
    return {
        type: _SETPAGE,
        data: inputData
    }
}

const initialState = {
    page: 1
}

export default function modal(state = initialState, action) {
    switch(action.type) {
        case _SETPAGE:
            return {
                page: action.data
            }
        default:
            return state
    }
}