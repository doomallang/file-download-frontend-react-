const _SAVE = "authInfo/_SAVE"
const _GET = "authInfo/_GET"

export const authInfoSave = (inputData) => ({
    type: _SAVE,
    data: {
        accountIdx: inputData.accountIdx,
        accountId: inputData.accountId,
        sessionToken: inputData.token,
    }
})

export const getAuthInfo = () => ({
    type: _GET
})

const initialState = {
    data: {
        sessionToken: '',
    }
}


export default function authInfo(state = initialState, action) {
    switch(action.type) {
        case _SAVE:
            return {
                data: {
                    ...action.data
                }
            }
        case _GET:
            return state
        default:
            return state
    }
}