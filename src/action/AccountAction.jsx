import * as http from 'util/HttpClient'

// url
import { SERVER, ACCOUNT } from 'constant/url'

// redux
import { store } from 'util/redux/store'
import { authInfoSave } from 'util/redux/authInfo'
import { modalClose } from 'util/redux/modal'

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

export async function getAccountList(startIndex, pageSize, searchOption, searchOptionText, searchOptionStatus) {
    let statuses = ''
    if(searchOptionStatus.length > 0) {
        statuses = searchOptionStatus.join()
    }
    const url = `${server}${ACCOUNT.M_GET_ACCOUNT_LIST}`
    const method = 'GET'
    const params = {
        startIndex: startIndex,
        pageSize: pageSize,
        searchOption: searchOption,
        searchOptionText: searchOptionText,
        statuses: statuses
    }
    const response = await http.request(url, method, '', params)
    return response.data
}

export async function getAccountListByGroupId(groupId) {
    const url = `${server}${ACCOUNT.M_GET_ACCOUNT_LIST_BY_GROUP_ID}`
    const method = 'GET'
    const params = {
        groupId: groupId
    }
    const response = await http.request(url, method, '', params)

    return response.data
}

export async function addAccount(account) {
    const url = `${server}${ACCOUNT.M_ACCOUNT}`
    const method = 'POST'
    const data = {
        accountId: account.accountId,
        password: account.password,
        name: account.name,
        grade: account.grade,
        groupId: account.groupId,
        status: account.status
    }
    const response = await http.request(url, method, data)
    if(response.status === 200) {
        await window.location.replace('user')
    }
}

export async function modifyAccount(data) {
    const url = `${server}${ACCOUNT.M_ACCOUNT}`
    const method = 'PUT'

    const response = await http.request(url, method, data)
    if(response.status === 200) {
        store.dispatch(modalClose())
        await window.location.replace('account')
    }
}

export async function removeAccount(accountIdxs) {
    const url = `${server}${ACCOUNT.M_ACCOUNT}`
    const method = 'DELETE'

    const params = {
        accountIdxs: accountIdxs
    }

    const response = await http.request(url, method, '', params)
    if(response.status === 200) {
        store.dispatch(modalClose())
        await window.location.replace('user')
    }
}

export async function getSelectAccount(accountIdx) {
    const url = `${server}${ACCOUNT.M_ACCOUNT}`
    const method = 'GET'
    const params = {
        accountIdx: accountIdx
    }
    const response = await http.request(url, method, '', params)
    return response.data
}

export async function modifyAccounts(groupId, accountIdxs) {
    const url = `${server}${ACCOUNT.M_MODIFY_ACCOUNTS}`
    const method = 'PUT'
    const params = {
        groupId: groupId,
        accountIdxs: accountIdxs
    }
    const response = await http.request(url, method, '', params)
    return response.data
}

export async function getAccountInfo() {
    const url = `${server}${ACCOUNT.ACCOUNT}`
    const method = 'GET'

    const response = await http.request(url, method, '', '')
    return response.data
}