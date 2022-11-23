// WRAPPER
import SearchWrapper from 'component/wrapper/search/SearchWrapper'
import SearchTitle from 'component/wrapper/search/SearchTitle'
import SearchButtonWrapper from 'component/wrapper/search/SearchButtonWrapper'
import SearchLeftButton from 'component/wrapper/search/SearchLeftButton'
import SearchRightButton from 'component/wrapper/search/SearchRightButton'

import ContentWrapper from 'component/wrapper/ContentWrapper'
import AddModifyUserModal from 'component/modal/AddModifyUserModal'

import { useEffect, useState } from 'react'
import * as AccountAction from 'action/AccountAction'
import { useTranslation } from 'react-i18next'

export default function ManagerUserWrapper() {
    const { t } = useTranslation()

    const [accountList, setAccountList] = useState()
    const [modal, setModal] = useState(false)
    const headList = [t('COLUMN.NAME.GROUP'), t('COLUMN.NAME.ID'), t('COLUMN.NAME.NAME'), t('COLUMN.NAME.GRADE'), t('COLUMN.NAME.CREATE_DATE'), t('COLUMN.NAME.UPDATE_DATE')]
    const width = ['16%', '16%', '12%', '12%', '22%', '22%']
    const grades = ['사원', '주임', '대리', '과장', '차장', '부장']
    const [account, setAccount] = useState({
        accountIdx: '',
        accountId: '',
        password: '',
        name: '',
        grade: '',
        state: '',
        groupId: ''
    })
    
    function clickAddItemBtn() {        
        setModal(!modal)
        setAccount('')
    }
    
    useEffect(() => {
        async function getAccountList() {
            const userList = await AccountAction.getAccountList()
            setAccountList(userList)
        }
        getAccountList()
    }, [])

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

    return (
        <>
            <div id='mainLayout' className='fl_content layoutMainSearchWrap'>
                {modal ? 
                <AddModifyUserModal modalClose={clickAddItemBtn} grades={grades} handleChange={handleChange} statusChange={statusChange} />
                : <></>}
                <div id='layoutMainSearch' className='fl_contHeadBtnBox'>
                    <SearchTitle title='사용자 관리'>
                        <SearchWrapper />
                    </SearchTitle>
                    <SearchButtonWrapper>
                        <SearchLeftButton>
                            <li><button id='addItemBtn' type='button' className='addBtn' onClick={clickAddItemBtn}>사용자 추가</button></li>
                            <li><button id='modifyItemBtn' type='button'>수정</button></li>
                            <li><button id='excelDownload' type='button' className='excelBtn'>EXCEL</button></li>
                        </SearchLeftButton>
                        <SearchRightButton>
                            <li><button id='removeItemBtn' type='button'>삭제</button></li>
                        </SearchRightButton>
                    </SearchButtonWrapper>
                </div>
                <div className='fl_contBox'>
                    <ContentWrapper tBodyList={accountList} width={width} headList={headList}/>
                </div>
            </div>
        </>
    )
}