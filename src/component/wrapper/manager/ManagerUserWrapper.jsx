import { useDispatch } from 'react-redux'

// WRAPPER
import SearchWrapper from 'component/wrapper/search/SearchWrapper'
import SearchTitle from 'component/wrapper/search/SearchTitle'
import SearchButtonWrapper from 'component/wrapper/search/SearchButtonWrapper'
import SearchLeftButton from 'component/wrapper/search/SearchLeftButton'
import SearchRightButton from 'component/wrapper/search/SearchRightButton'
import AddModifyUserModal from 'component/modal/AddModifyUserModal'
import Head from 'component/wrapper/content/Head'
import Body from 'component/wrapper/content/Body'
import Page from 'component/wrapper/content/Page'

import { useEffect, useState } from 'react'
import * as AccountAction from 'action/AccountAction'
import * as GroupAction from 'action/GroupAction'
import * as util from 'util/util'

import { useTranslation } from 'react-i18next'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import SelectGroupModal from 'component/modal/SelectGroupModal'

// redux
import { modalOpen } from 'util/redux/modal'

export default function ManagerUserWrapper() {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [accountList, setAccountList] = useState()
    const [startIndex, setStartIndex] = useState(0)
    const [isReadOnly, setIsReadOnly] = useState(false)
    const [pageSize, setPageSize] = useState(20)
    const [isModify, setIsModify] = useState(false)
    const [groupList, setGroupList] = useState([])
    const [selectGroupModal, setSelectGroupModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState('')
    const [checkedItem, setCheckedItem] = useState([])
    const [modal, setModal] = useState(false)
    const [searchOptionStatus, setSearchOptionStatus] = useState([0])
    const [searchOption, setSearchOption] = useState('name')
    const [searchOptionText, setSearchOptionText] = useState('')

    const headList = [t('COLUMN.NAME.GROUP'), t('COLUMN.NAME.ID'), t('COLUMN.NAME.NAME'), t('COLUMN.NAME.GRADE'), t('COLUMN.NAME.CREATE_DATE'), t('COLUMN.NAME.UPDATE_DATE')]
    const width = ['16%', '16%', '12%', '12%', '20%', '20%', '4%']
    const grades = ['사원', '주임', '대리', '과장', '차장', '부장']
    const [account, setAccount] = useState({
        grade: '사원',
        status: 0
    })
    const [accountInfo, setAccountInfo] = useState()
    
    function clickAddItemBtn() {
        setModal(true)
    }

    function clickModifyItemBtn() {
        if(selectedItem === '') {
            dispatch(modalOpen(t('SERVER.MESSAGE.PLEASE_CHOICE_ACCOUNT')))
        } else {
            getSelectAccount()
            setIsModify(true)
            setIsReadOnly(true)
            setModal(true)
        }
    }

    async function getSelectAccount() {
        const accountInfo = await AccountAction.getSelectAccount(selectedItem)
        await console.log(accountInfo)
        setAccountInfo(accountInfo)
        setAccount(accountInfo)
    }

    function closeModal() {
        setModal(false)
        setAccount('')
        setIsReadOnly(false)
        setIsModify(false)
    }
    
    useEffect(() => {
        getTopGroupList()
        getAccountList()
    }, [])

    useEffect(() => {
        getTopGroupList()
        getAccountList()
    }, [pageSize])

    async function getAccountList() {
        const userList = await AccountAction.getAccountList(startIndex, pageSize, searchOption, searchOptionText, searchOptionStatus)
        await setAccountList(userList)
        await setLoading(false)
    }

    async function getTopGroupList() {
        const groupList = await GroupAction.getTopGroupList()
        await setGroupList(groupList)
    }

    // STATE set upper group(add/modify modal)
    function applySelectGroup(parentGroup) {
        let key = parentGroup.groupKey[0].split('-')
        const groupId = key[key.length - 1]
        setAccount({
            ...account,
            groupId: groupId,
            groupName: parentGroup.groupName
        })
    }

    async function addModifyUser() {
        if(isModify) {
            const params = modifyDataCompare()
            if(Object.keys(params).length === 0) {
                dispatch(modalOpen(t('SERVER.MESSAGE.NO_EDITS_FOUND')))
            } else {
                params.accountIdx = account.accountIdx
                await AccountAction.modifyAccount(params)
            }
        } else {
            if(account.name === undefined) {dispatch(modalOpen(t('SERVER.MESSAGE.PLEASE_ENTER_GROUP_NAME'))); return;}
            if(account.accountId === undefined) {dispatch(modalOpen(t('SERVER.MESSAGE.PLEASE_ENTER_ID'))); return;}
            if(account.password === undefined) {dispatch(modalOpen(t('SERVER.MESSAGE.PLEASE_ENTER_PASSWORD'))); return;}
            if(account.groupId === undefined) {dispatch(modalOpen(t('SERVER.MESSAGE.PLEASE_CHOICE_GROUP'))); return;}

            //await AccountAction.addAccount(account)
        }
    }

    // CHECK modify contents
    function modifyDataCompare() {
        const params = {}
        if(accountInfo.name !== account.name) {params.name = account.name}
        if(accountInfo.grade !== account.grade) {params.grade = account.grade}
        if(accountInfo.groupId !== account.groupId) {params.groupId = account.groupId}
        if(accountInfo.status !== account.status) {params.status = account.status}

        return params
    }


    function openSelectGroupModal() {
        setSelectGroupModal(true)
    }

    // OPEN modal upper group
    function closeSelectGroupModal() {
        setSelectGroupModal(false)
    }

    function handleChange(e) {
        const {id, value} = e.target
        setAccount({
            ...account,
            [id]: value
        })
    }

    async function statusChange(e) {
        await setAccount({
            ...account,
            status: e.target.value
        })
    }

    function changeOption(e) {
        setSearchOption(e.target.value)
    }

    function changeText(e) {
        setSearchOptionText(e.target.value)
    }

    function search() {
        getAccountList()
    }

    function handleOnKeyPress(e) {
        if (e.key === 'Enter') {
          search() // Enter 입력이 되면 클릭 이벤트 실행
        }
    }

    // CLICK delete button 
    function clickDeleteButton() {
        if(checkedItem.length < 1) {
            dispatch(modalOpen(t('SERVER.MESSAGE.PLEASE_SELECT_GROUP')))
        } else {
            dispatch(modalOpen(t('SERVER.MESSAGE.ARE_YOU_WANT_TO_DELETE'), true, removeAccount))
        }
    }
    async function removeAccount() {
        let accountIdxs = checkedItem.join(',')
        await AccountAction.removeAccount(accountIdxs)
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
                    <SelectGroupModal isModify={isModify} groupLists={groupList} applySelectGroup={applySelectGroup} close={closeSelectGroupModal} />
                : <></>}
                {modal ? 
                <AddModifyUserModal modalClose={closeModal} grades={grades} handleChange={handleChange} statusChange={statusChange} openSelectGroupModal={openSelectGroupModal} addModifyUser={addModifyUser} account={account} isReadOnly={isReadOnly} />
                : <></>}
                <div id='layoutMainSearch' className='fl_contHeadBtnBox'>
                    <SearchTitle title='사용자 관리'>
                        <SearchWrapper>
                            <select id='searchTextOption' className='wid180' onChange={changeOption}>
                                <option value='name'>{t('COLUMN.NAME.NAME')}</option>
                                <option value='memberId'>{t('COLUMN.NAME.ID')}</option>
                            </select>
                            <input id='searchText' type='text' placeholder='검색' className='wid150' onChange={changeText} onKeyPress={handleOnKeyPress} />
                            <span id='searchBtn' className='typeButton' onClick={search} >
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                            <input type='checkbox' id='memberStatus_CREATE' name='memberStatus' value='0' checked={searchOptionStatus.includes(0) ? 'checked' : '' } onChange={(e) => util.handleSingleCheck(e.target.checked, 0, searchOptionStatus, setSearchOptionStatus)} />
                            <label htmlFor='memberStatus_CREATE' className='c-search-label'>{t('COLUMN.NAME.WORK')}</label>
                            <input type='checkbox' id='memberStatus_DELETE' name='memberStatus' value='1' checked={searchOptionStatus.includes(1) ? 'checked' : '' } onChange={(e) => util.handleSingleCheck(e.target.checked, 1, searchOptionStatus, setSearchOptionStatus)} />
                            <label htmlFor='memberStatus_DELETE' className='c-search-label'>{t('COLUMN.NAME.ABSENCE')}</label>
                            <input type='checkbox' id='memberStatus_ERASE' name='memberStatus' value='2' checked={searchOptionStatus.includes(2) ? 'checked' : '' } onChange={(e) => util.handleSingleCheck(e.target.checked, 2, searchOptionStatus, setSearchOptionStatus)} />
                            <label htmlFor='memberStatus_ERASE' className='c-search-label'>{t('COLUMN.NAME.RESIGNATION')}</label>
                            
                        </SearchWrapper>
                    </SearchTitle>
                    <SearchButtonWrapper>
                        <SearchLeftButton>
                            <li><button id='addItemBtn' type='button' className='addBtn' onClick={clickAddItemBtn}>{t('COLUMN.NAME.ADD')}</button></li>
                            <li><button id='modifyItemBtn' type='button' onClick={clickModifyItemBtn}>{t('COLUMN.NAME.MODIFY')}</button></li>
                            <li><button id='excelDownload' type='button' className='excelBtn'>{t('COLUMN.NAME.EXCEL')}</button></li>
                        </SearchLeftButton>
                        <SearchRightButton>
                            <li><button id='removeItemBtn' type='button' onClick={clickDeleteButton}>{t('COLUMN.NAME.DELETE')}</button></li>
                        </SearchRightButton>
                    </SearchButtonWrapper>
                </div>
                <div className='fl_contBox'>
                    <div id='layoutMainList' className='tList'>
                        <Head>
                            {headList && headList.map((head, index) =>
                                <th key={index} width={width[index]} className='textLeftIm'>{head}</th>
                            )}
                            <th className='textLeftIm'><input type='checkbox' onChange={(e) => util.handleAllCheck(e.target.checked, 'accountIdx', accountList.list, setCheckedItem)} checked={checkedItem.length === accountList.list.length && checkedItem.length > 0 ? true : false}/></th>
                        </Head>
                        <div className='tBodyBox'>
                            <Body>
                                { accountList.list.length && accountList.list.map((account, index) => 
                                <tr key={index} onClick={() => util.itemClick(account.accountIdx, selectedItem, setSelectedItem)} className={selectedItem === account.accountIdx ? 'selectedTr' : ''}>
                                    <td width={width[0]} className='textLeftIm'>{account.groupName}</td>
                                    <td width={width[1]} className='textLeftIm'>{account.accountId}</td>
                                    <td width={width[2]} className='textLeftIm'>{account.name}</td>
                                    <td width={width[3]} className='textLeftIm'>{account.grade}</td>
                                    <td width={width[4]} className='textLeftIm'>{account.createDatetime}</td>
                                    <td width={width[5]} className='textLeftIm'>{account.updateDatetime}</td>
                                    <td width={width[6]} className='textLeftIm'><input type='checkbox' onChange={(e) => util.handleSingleCheck(e.target.checked, account.accountIdx, checkedItem, setCheckedItem)} checked={checkedItem.includes(account.accountIdx) ? true : false} /></td>
                                </tr>
                                )}
                            </Body>
                            <Page count={accountList.listCount} setPageSize={setPageSize} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}