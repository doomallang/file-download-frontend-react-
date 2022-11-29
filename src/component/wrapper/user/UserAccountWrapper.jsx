// BUTTON
import SearchButtonWrapper from 'component/wrapper/search/SearchButtonWrapper'
import SearchLeftButton from 'component/wrapper/search/SearchLeftButton'
import SearchTitle from "component/wrapper/search/SearchTitle"

// ACTION
import * as AccountAction from 'action/AccountAction'

// i18n
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from "react"

// REDUX
import { useDispatch } from 'react-redux'
import { modalOpen } from 'util/redux/modal'

export default function UserAccountWrapper() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [account, setAccount] = useState({})

    useEffect(() => {
        getAccountInfo()
    }, [])

    async function getAccountInfo() {
        const accountInfo = await AccountAction.getAccountInfo()
        await setAccount(accountInfo)
        await setLoading(false)
    }

    function clickModifyItemBtn() {
        dispatch(modalOpen(t('SERVER.MESSAGE.ARE_YOU_WANT_TO_MODIFY'), true, modifyAccount))
    }

    async function modifyAccount() {
        const params = {
            accountIdx: account.accountIdx,
            password: account.password,
            name: account.name
        }
        AccountAction.modifyAccount(params)
    }

    function handleChange(e) {
        const {id, value} = e.target
        setAccount({
            ...account,
            [id]: value
        })
    }

    if(loading) {
        return (
            <></>
        )
    }
    return (
        <>
            <div id='mainLayout' className='fl_content layoutMainSearchWrap'>
                <div id='layoutMainSearch' className='fl_contHeadBtnBox'>
                    <SearchTitle title={t('MENU.NAME.ACCOUNT')} />
                    <SearchButtonWrapper>
                        <SearchLeftButton>
                            <li><button id='addItemBtn' type='button' onClick={clickModifyItemBtn}>{t('COLUMN.NAME.MODIFY')}</button></li>
                        </SearchLeftButton>
                    </SearchButtonWrapper>
                </div>
                <div className='fl_contBox'>
                    <div id='layoutMainList' className='tList'>
                        <form>
                            <div id='ransomCruncherDetectPolicyInfo' className='modalBox'>
                                <dl className='layoutWrap'>
                                    <dt>
                                        <label>{t('COLUMN.NAME.ID')}</label> 
                                    </dt>
                                    <dd>
                                        <input type='text' id='accountId' value={account.accountId} className='wid250' readOnly/>
                                    </dd>
                                </dl>
                                <dl className='layoutWrap'>
                                    <dt>
                                        <label>{t('COLUMN.NAME.PASSWORD')}</label> 
                                    </dt>
                                    <dd>
                                        <input type='password' id='password' onChange={handleChange} className='wid250' />
                                    </dd>
                                </dl>
                                <dl className='layoutWrap'>
                                    <dt>
                                        <label>{t('COLUMN.NAME.NAME')}</label> 
                                    </dt>
                                    <dd>
                                        <input type='text' id='name' value={account.name} onChange={handleChange} className='wid250'/>
                                    </dd>
                                </dl>
                                <dl className='layoutWrap'>
                                    <dt>
                                        <label>{t('COLUMN.NAME.GRADE')}</label> 
                                    </dt>
                                    <dd>
                                        <input type='text' id='grade' value={account.grade} className='wid250' readOnly/>
                                    </dd>
                                </dl>
                                <dl className='layoutWrap'>
                                    <dt>
                                        <label>{t('COLUMN.NAME.GROUP')}</label> 
                                    </dt>
                                    <dd>
                                        <input type='text' id='groupName' value={account.groupName} className='wid250' readOnly/>
                                    </dd>
                                </dl>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}