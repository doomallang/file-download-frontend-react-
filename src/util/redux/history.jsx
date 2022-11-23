const _SAVE = "authInfo/_SAVE"
const _GET = "authInfo/_GET"

export const historySave = (pageName) => ({
    type: _SAVE,
    data: pageName
})

export const getHistory = () => ({
    type: _GET
})

const initialState = {
    data: ''
}


export default function history(state = initialState, action) {
    switch(action.type) {
        case _SAVE:
            return {
                data: action.data
            }
        case _GET:
            return state
        default:
            return state
    }
}