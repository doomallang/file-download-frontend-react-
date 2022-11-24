const _OPEN = "modal/_OPEN"
const _CLOSE = "modal/_CLOSE"

export function modalOpen(inputData, isButton, func) {
    return {
        type: _OPEN,
        data: inputData,
        isButton: isButton,
        func: func
    }
}

export function modalClose() {
    return {
        type: _CLOSE
    }
}

const initialState = {
    isOpen: false,
    message: '',
    isButton: false
}

export default function modal(state = initialState, action) {
    switch(action.type) {
        case _OPEN:
            return {
                isOpen: true,
                message: action.data,
                isButton: action.isButton,
                func: action.func
            }
        case _CLOSE:
            return {
                isOpen: false,
                isButton: false
            }
        default:
            return state
    }
}