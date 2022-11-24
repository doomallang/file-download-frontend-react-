import * as util from 'util/util'
import { useDispatch } from 'react-redux'

// WRAPPER
import SearchTitle from 'component/wrapper/search/SearchTitle'
import SearchButtonWrapper from 'component/wrapper/search/SearchButtonWrapper'
import SearchLeftButton from 'component/wrapper/search/SearchLeftButton'
import SearchRightButton from 'component/wrapper/search/SearchRightButton'

// MODAL
import MessageModal from 'component/modal/MessageModal'
import AddModifyGroupModal from 'component/modal/AddModifyGroupModal'
import SelectGroupModal from 'component/modal/SelectGroupModal'
import AddUserModal from 'component/modal/AddUserModal'

// TREE
import GroupTree from 'component/tree/GroupTree'

import { useEffect, useState } from 'react'
import * as GroupAction from 'action/GroupAction'
import { useTranslation } from 'react-i18next'

import { modalOpen, modalClose } from 'util/redux/modal'

export default function ManagerGroupWrapper() {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [modal, setModal] = useState(false)
    const [selectGroupModal, setSelectGroupModal] = useState(false)
    const [addUserModal, setAddUserModal] = useState(false)
    const [groupList, setGroupList] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectGroup, setSelectGroup] = useState({groupKey: '', groupName: ''})
    const [isModify, setIsModify] = useState(false)
    const [group, setGroup] = useState({})
    const [groupInfo, setGroupInfo] = useState()

    useEffect(() => {
        async function getTopGroupList() {
            const groupList = await GroupAction.getTopGroupList()
            await setGroupList(groupList)
            await setLoading(false)
        }
        getTopGroupList()
    }, [])

    // CLICK group add button
    function clickAddItemBtn() {     
        setIsModify(false)
        if(selectGroup.groupKey.length < 1) {
            dispatch(modalOpen(t('SERVER.MESSAGE.PLEASE_SELECT_GROUP')))
        } else {
            let key = selectGroup.groupKey[0].split('-')
            setGroup({
                parentGroupId: key[key.length - 1],
                parentGroupName: selectGroup.groupName
            })
            setModal(!modal)
        }
    }

    // CLICK group modify button
    async function clickModifyItemBtn() {    
        setIsModify(true)
        await getGroupInfo()
        if(selectGroup.groupKey.length < 1) {
            dispatch(modalOpen(t('SERVER.MESSAGE.PLEASE_SELECT_GROUP')))
        } else {
            await setModal(!modal)
        }
    }

    // ACTION get select group info
    async function getGroupInfo() {
        if(selectGroup.groupKey !== '') {
            let key = selectGroup.groupKey[0].split('-')
            const groupId = key[key.length - 1]
            const groupInfos = await GroupAction.getGroup(groupId)
            setGroupInfo({
                groupId: groupInfos.groupId,
                groupName: groupInfos.groupName,
                phoneNumber: groupInfos.phoneNumber,
                parentGroupId: groupInfos.parentGroupId,
                parentGroupName: groupInfos.parentGroupName
            })
            setGroup({
                groupId: groupInfos.groupId,
                groupName: groupInfos.groupName,
                phoneNumber: groupInfos.phoneNumber,
                parentGroupId: groupInfos.parentGroupId,
                parentGroupName: groupInfos.parentGroupName
            })
        }
    }

    // ACTION group add/modify
    async function addModifyGroup() {
        if(isModify) {
            const params = modifyDataCompare()
            if(Object.keys(params).length === 0) {
                dispatch(modalOpen(t('SERVER.MESSAGE.NO_EDITS_FOUND')))
            } else {
                params.groupId = group.groupId
                await GroupAction.modifyGroup(params)
            }
        } else {
            if(group.groupName === '') {dispatch(modalOpen(t('SERVER.MESSAGE.PLEASE_ENTER_GROUP_NAME'))); return;}
            if(group.phoneNumber === '') {dispatch(modalOpen(t('SERVER.MESSAGE.PLEASE_ENTER_PHONE_NUMBER'))); return;}
            await GroupAction.addGroup(group)
        }
    }

    // CHECK modify contents
    function modifyDataCompare() {
        const params = {}
        if(groupInfo.groupName !== group.groupName) {params.groupName = group.groupName}
        if(groupInfo.phoneNumber !== group.phoneNumber) {params.phoneNumber = group.phoneNumber}
        if(groupInfo.parentGroupId !== group.parentGroupId) {params.parentGroupId = group.parentGroupId}

        return params
    }

    // OPEN modal upper group
    function openSelectGroupModal() {
        setSelectGroupModal(true)
    }

    // OPEN modal upper group
    function closeSelectGroupModal() {
        setSelectGroupModal(false)
    }

    // ACTION get select group's under group
    async function getSelectGroupList(key, groupIdx) {
        const list = await GroupAction.getSelectGroupList(key)
        const treeList = await GroupAction.makeTreeList(list, groupIdx)
        return await treeList
    }

    // OPEN modal add user
    function openAddUserModal() {
        if(selectGroup.groupKey.length < 1) {
            dispatch(modalOpen(t('SERVER.MESSAGE.PLEASE_SELECT_GROUP')))
        } else {
            setAddUserModal(true)
        }
    }

    // CLOSE modal add user
    function closeAddUserModal() {
        setAddUserModal(false)
    }

    // STATE state group change
    function handleChange(e) {
        const {id, value} = e.target
        setGroup({
            ...group,
            [id]: value
        })
    }

    // STATE set upper group(add/modify modal)
    function applySelectGroup(parentGroup) {
        let key = parentGroup.groupKey[0].split('-')
        const groupId = key[key.length - 1]
        setGroup({
            ...group,
            parentGroupId: groupId,
            parentGroupName: parentGroup.groupName
        })
    }

    // CLICK delete button 
    function clickDeleteButton() {
        if(selectGroup.groupKey.length < 1) {
            dispatch(modalOpen(t('SERVER.MESSAGE.PLEASE_SELECT_GROUP')))
        } else {
            dispatch(modalOpen(t('SERVER.MESSAGE.ARE_YOU_WANT_TO_DELETE'), true, deleteGroup))
        }
    }

    // ACTION delete group
    async function deleteGroup(isDone) {
        if(isDone) {
            let key = selectGroup.groupKey[0].split('-')
            const groupId = key[key.length - 1]
            if(Number(groupId) === 1) {
                dispatch(modalOpen(t('SERVER.MESSAGE.CANNOT_DELETE_TOP_LEVEL_GROUP')))
            } else {
                dispatch(modalClose())
                await GroupAction.removeGroup(groupId)

            }
        }
    }

    if(loading) {
        return (
            <></>
        )
    }
    return (
        <>
            <div id='mainLayout' className='fl_content layoutMainSearchWrap'>
                {selectGroupModal ?
                    <SelectGroupModal isModify={isModify} selGroup={selectGroup} groupLists={groupList} applySelectGroup={applySelectGroup} close={closeSelectGroupModal} />
                : <></>}
                {modal ? 
                    <AddModifyGroupModal modalClose={clickAddItemBtn} addModifyGroup={addModifyGroup} group={group} handleChange={handleChange} openSelectGroupModal={openSelectGroupModal} />
                : <></>}
                {addUserModal ? 
                    <AddUserModal selectGroup={selectGroup} modalClose={closeAddUserModal} />
                : <></>}
                <div id='layoutMainSearch' className='fl_contHeadBtnBox'>
                    <SearchTitle title='그룹 관리' />
                    <SearchButtonWrapper>
                        <SearchLeftButton>
                            <li><button id='addItemBtn' type='button' className='addBtn' onClick={clickAddItemBtn}>추가</button></li>
                            <li><button id='addModifyUserItemBtn' type='button' onClick={openAddUserModal}>사용자 추가/삭제</button></li>
                            <li><button id='modifyItemBtn' type='button' onClick={clickModifyItemBtn}>수정</button></li>
                            <li><button id='excelDownload' type='button' className='excelBtn'>EXCEL</button></li>
                        </SearchLeftButton>
                        <SearchRightButton>
                            <li><button id='removeItemBtn' type='button' onClick={clickDeleteButton}>삭제</button></li>
                        </SearchRightButton>
                    </SearchButtonWrapper>
                </div>
                <div className='fl_contBox'>
                    <div className='ml20 mt10'>
                        <GroupTree list={groupList} getSelectGroupList={getSelectGroupList} setSelectGroup={setSelectGroup} />
                    </div>
                </div>
            </div>
        </>
    )
}