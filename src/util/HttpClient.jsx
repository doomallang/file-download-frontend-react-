import axios from 'axios'

// redux
import { store } from 'util/redux/store'
import { modalToggle } from './redux/modal'

const defaultHeaderConfig = {
	Accept: 'application/json; charset=utf-8',
}

function isEmptyObj(obj)  {
    if(obj.constructor === Object
       && Object.keys(obj).length === 0)  {
      return true;
    }
    
    return false;
}

export async function request(url, method, data = {}, params = {}) {
    const token = store.getState().authInfo.data
    let tokenConfig = {}
    if(!isEmptyObj(token)) {
        tokenConfig = Object.assign({}, {
            "x-cms-id": token.accountId,
            "x-cms-token": token.sessionToken
        })
    }
    const req = {
        url: url,
        method: method,
        headers: Object.assign({}, 
            defaultHeaderConfig, 
            tokenConfig),
        data: data,
        params: params
    }
    let response
    try {
        response = await axios(req)
    } catch (error) {
        response = error.response
    }
    const state = await AuthenticationErrorHandler(response)
    if(state === 1) return
    
    return response
}

// 인증 에러 처리
export async function AuthenticationErrorHandler(response) {
    let message;
	// 서버가 dead 상태, 403, 세션인증에러 일때
	if(response.status === 403) {
		message = 'SERVER.MESSAGE.SIGN_IN_INFOMATION_HAS_EXPIRED_OR_NOT_ACCESS'
		await store.dispatch(modalToggle(message))
        //await window.location.replace('/')
	} else if(response.status === 422) {
        store.dispatch(modalToggle(response.data.message))
        return 1
    }
}