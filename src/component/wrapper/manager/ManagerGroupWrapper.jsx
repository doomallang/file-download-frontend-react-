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

export default function ManagerGroupWrapper() {
    const { t } = useTranslation()
    const [modal, setModal] = useState(false)
    const [messageModal, setMessageModal] = useState(false)
    const [selectGroupModal, setSelectGroupModal] = useState(false)
    const [addUserModal, setAddUserModal] = useState(false)
    const [applyButton, setApplyButton] = useState(false)
    const [message, setMessage] = useState('')
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

    function handleChange(e) {
        const {id, value} = e.target
        setGroup({
            ...group,
            [id]: value
        })
    }

    // 그룹 추가 BUTTON
    function clickAddItemBtn() {     
        setIsModify(false)
        if(selectGroup.groupKey.length < 1) {
            messageModalOpen(t('SERVER.MESSAGE.PLEASE_SELECT_GROUP'))
        } else {
            let key = selectGroup.groupKey[0].split('-')
            setGroup({
                parentGroupId: key[key.length - 1],
                parentGroupName: selectGroup.groupName
            })
            setModal(!modal)
        }
    }

    // 그룹 수정 BUTTON
    async function clickModifyItemBtn() {    
        setIsModify(true)
        await getGroupInfo()
        if(selectGroup.groupKey.length < 1) {
            messageModalOpen(t('SERVER.MESSAGE.PLEASE_SELECT_GROUP'))
        } else {
            await setModal(!modal)
        }
    }

    // 그룹 가져오기
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

    function messageModalOpen(message) {
        setMessage(message)
        setMessageModal(true)
    }

    function messageModalClose() {
        setMessage('')
        setApplyButton(false)
        setMessageModal(false)
    }

    async function addModifyGroup() {
        if(isModify) {
            const params = modifyDataCompare()
            if(Object.keys(params).length === 0) {
                messageModalOpen(t('SERVER.MESSAGE.NO_EDITS_FOUND'))
            } else {
                params.groupId = group.groupId
                await GroupAction.modifyGroup(params)
            }
        } else {
            if(group.groupName === '') {messageModalOpen(t('SERVER.MESSAGE.PLEASE_ENTER_GROUP_NAME')); return;}
            if(group.phoneNumber === '') {messageModalOpen(t('SERVER.MESSAGE.PLEASE_ENTER_PHONE_NUMBER')); return;}
            await GroupAction.addGroup(group)
        }
    }

    // 수정된 항목 확인
    function modifyDataCompare() {
        const params = {}
        if(groupInfo.groupName !== group.groupName) {params.groupName = group.groupName}
        if(groupInfo.phoneNumber !== group.phoneNumber) {params.phoneNumber = group.phoneNumber}
        if(groupInfo.parentGroupId !== group.parentGroupId) {params.parentGroupId = group.parentGroupId}

        return params
    }

    // 부모 그룹 변경
    function selectParentGroup() {
        setSelectGroupModal(!selectGroupModal)
    }

    async function getSelectGroupList(key, groupIdx) {
        const list = await GroupAction.getSelectGroupList(key)
        const treeList = await GroupAction.makeTreeList(list, groupIdx)
        return await treeList
    }
    
    function closeSelectGroupModal() {
        setSelectGroupModal(false)
    }

    function openAddUserModal() {
        if(selectGroup.groupKey.length < 1) {
            messageModalOpen(t('SERVER.MESSAGE.PLEASE_SELECT_GROUP'))
        } else {
            setAddUserModal(true)
        }
    }

    function closeAddUserModal() {
        setAddUserModal(false)
    }
    
    function applySelectGroup(parentGroup) {
        let key = parentGroup.groupKey[0].split('-')
        const groupId = key[key.length - 1]
        setGroup({
            ...group,
            parentGroupId: groupId,
            parentGroupName: parentGroup.groupName
        })
    }

    function clickDeleteButton() {
        if(selectGroup.groupKey.length < 1) {
            messageModalOpen(t('SERVER.MESSAGE.PLEASE_SELECT_GROUP'))
        } else {
            setApplyButton(true)
            messageModalOpen(t('SERVER.MESSAGE.ARE_YOU_WANT_TO_DELETE'))
        }
    }

    async function deleteGroup(isDone) {
        
        if(isDone) {
            let key = selectGroup.groupKey[0].split('-')
            const groupId = key[key.length - 1]
            if(Number(groupId) === 1) {
                setApplyButton(false)
                messageModalOpen(t('SERVER.MESSAGE.CANNOT_DELETE_TOP_LEVEL_GROUP'))
            } else {
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
                {messageModal ? 
                    <MessageModal message={message} close={messageModalClose} useApplyButton={applyButton} propFunction={deleteGroup} />
                : <></>}
                {selectGroupModal ?
                    <SelectGroupModal groupLists={groupList} applySelectGroup={applySelectGroup} close={closeSelectGroupModal} />
                : <></>}
                {modal ? 
                    <AddModifyGroupModal modalClose={clickAddItemBtn} addModifyGroup={addModifyGroup} handleChange={handleChange} group={group} selectParentGroup={selectParentGroup} />
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
                    <GroupTree list={groupList} getSelectGroupList={getSelectGroupList} setSelectGroup={setSelectGroup} />
                </div>
            </div>
        </>
    )
}