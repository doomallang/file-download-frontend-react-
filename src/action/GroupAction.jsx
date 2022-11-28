import * as http from 'util/HttpClient'

// url
import { SERVER, GROUP } from 'constant/url'

const server = `${SERVER.IP}:${SERVER.PORT}`

export async function getTopGroupList() {
    const url = `${server}${GROUP.GET_TOP_GROUP_LIST}`
    const method = 'GET'
    const response = await http.request(url, method)
    
    return response.data
}

// 계정 목록 가져오기
export async function getSelectGroupList(groupId, exceptGroupId) {
    const url = `${server}${GROUP.GET_SELECT_GROUP_LIST}`
    const method = 'GET'
    const params = {
        groupId: groupId,
        exceptGroupId: exceptGroupId
    }
    const response = await http.request(url, method, '', params)

    return response.data
}

export async function addGroup(group) {
    const url = `${server}${GROUP.GROUP}`
    const method = 'POST'
    const data = {
        groupName: group.groupName,
        phoneNumber: group.phoneNumber,
        parentGroupId: group.parentGroupId
    }
    await http.request(url, method, data)
    await window.location.replace('group')
}

export async function modifyGroup(params) {
    const url = `${server}${GROUP.GROUP}`
    
    const method = 'PUT'
    
    const data = {
        groupId: params.groupId,
        groupName: params.groupName,
        phoneNumber: params.phoneNumber,
        parentGroupId: params.parentGroupId
    }
    await http.request(url, method, data)
    await window.location.replace('group')
}

export async function getGroup(groupId) {
    const url = `${server}${GROUP.GROUP}`
    const method = 'GET'
    const params = {
        groupId: groupId
    }
    const response = await http.request(url, method, '', params)

    return response.data
}

export async function removeGroup(groupId) {
    const url = `${server}${GROUP.GROUP}`
    const method = 'DELETE'
    const params = {
        groupId: groupId
    }

    await http.request(url, method, '', params)
    await window.location.replace('group')
}

export async function makeTreeList(list, groupId) {
    const treeList = list.map(item => {
        let newArr = {}
        newArr['title'] = item.groupName
        newArr['key'] = `${groupId}-${item.groupId}`
        if(item.hasChild === 0) {
            newArr['isLeaf'] = true
        }
        return newArr
    })
    
    return await treeList
}