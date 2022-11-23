import * as http from 'util/HttpClient'

// url
import { SERVER, ACCOUNT } from 'constant/url'

// redux
import { store } from 'util/redux/store'
import { authInfoSave } from 'util/redux/authInfo'

const server = `${SERVER.IP}:${SERVER.PORT}`

export async function login(account) {
    const url = `${server}${ACCOUNT.LOGIN}`
    const method = 'post'
    const data = {
        accountId: account.id,
        password: account.password
    }
    const response = await http.request(url, method, data)
    await store.dispatch(authInfoSave(response.data))
    await window.location.replace('main/account')
}

export async function getAccountList(params) {
    const url = `${server}${ACCOUNT.GET_ACCOUNT_LIST}`
    const method = 'GET'
    const response = await http.request(url, method, '', params)
    
    return response.data
}

export async function getAccountListByGroupId(groupId) {
    const url = `${server}${ACCOUNT.GET_ACCOUNT_LIST_BY_GROUP_ID}`
    const method = 'GET'
    const params = {
        groupId: groupId
    }
    const response = await http.request(url, method, '', params)

    return response.data
}

export async function addAccount(account) {
    const url = `${server}${ACCOUNT.ADD_ACCOUNT}`
    const method = 'POST'
    const data = {
        userId: account.userId,
        userPassword: account.userPassword,
        userName: account.userName,
        groupId: account.groupId
    }
    const response = await http.request(url, method, data)
}

export async function getSelectAccount(accountId) {
    const url = `${server}${ACCOUNT.GET_SELECT_ACCOUNT}`
    const method = 'GET'
    const params = {
        accountId: accountId
    }
    const response = await http.request(url, method, '', params)
    return response.data
}

export async function modifyAccounts(groupId, accountIdxs) {
    const url = `${server}${ACCOUNT.MODIFY_ACCOUNTS}`
    const method = 'PUT'
    const params = {
        groupId: groupId,
        accountIdxs: accountIdxs
    }
    const response = await http.request(url, method, '', params)
    return response.data
}