const _OPEN = "modal/_OPEN"

export function modalToggle(inputData) {
    return {
        type: _OPEN,
        data: inputData
    }
}

const initialState = {
    isOpen: false,
    message: ''
}

export default function modal(state = initialState, action) {
    switch(action.type) {
        case _OPEN:
            return {
                isOpen: !state.isOpen,
                message: action.data
            }
        default:
            return state
    }
}