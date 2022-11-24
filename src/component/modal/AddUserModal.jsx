import * as util from 'util/util'

import { useTranslation } from "react-i18next"

// wrapper
import UserSelectModal from "component/modal/UserSelectModal"

// action
import * as AccountAction from 'action/AccountAction'

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"

export default function AddUserModal({ selectGroup, modalClose }) {
    const { t } = useTranslation()
    const [userSelectModal, setUserSelectModal] = useState(false)
    const [checkedItem, setCheckedItem] = useState([])
    const [accountList, setAccountList] = useState([])
    const [accountCount, setAccountCount] = useState(0)

    let groupKey = selectGroup.groupKey[0].split('-')
    const groupId = groupKey[groupKey.length - 1]

    useEffect(() => {    
        getAccountListByGroupId()
    }, [])

    function openUserSelectModal() {
        setUserSelectModal(true)
    }

    function closeUserSelectModal() {
        setUserSelectModal(false)
    }

    async function deleteUser() {
        let accountIdxs = checkedItem.join(',')
        await AccountAction.modifyAccounts(0, accountIdxs)
        await getAccountListByGroupId()
    }

    async function getAccountListByGroupId() {
        const data = await AccountAction.getAccountListByGroupId(groupId)
        await setAccountList(data.list)
        await setAccountCount(data.listCount)
    }
    
    async function addUser(list) {
        const accountIdxArray = []
        list.forEach(el => {
            accountIdxArray.push(el.accountIdx)
        })
        let accountIdxs = accountIdxArray.join(',')
        await AccountAction.modifyAccounts(groupId, accountIdxs)
        await getAccountListByGroupId()
        await closeUserSelectModal()
    }
    
    return (
        <>
        {userSelectModal ?
        <UserSelectModal close={closeUserSelectModal} addUser={addUser} />
        : <></>}
        <div className='modalUserForm c-ui-modal-dialog'>
            <div className='modal-contents'>
                <div className='modal-headers'>
                    <span className='modal-titles'>
                        <span>{t('COLUMN.NAME.ADD_ACCOUNT')}</span>
                    </span>
                    <button type='button' className='close' onClick={modalClose}>
                        <span aria-hidden='true'>x</span>
                    </button>
                </div>
                <div className='modal-body'>
                    <div className='modalBox'>
                        <div className='modalList'>
                            <dl>
                                <dt><b>{t('COLUMN.NAME.GROUP_NAME')}</b></dt>
                                <dd><span>{selectGroup.groupName}</span></dd>
                            </dl>
                            <dl className='modalWidthBox'>
                                <dt>
                                    <b>{t('COLUMN.NAME.USER')}</b>
                                    <span> : <span id='userCount'>{accountCount}</span>명</span>
                                    <button id='selectUserBtn' type='button' className='act' onClick={openUserSelectModal}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                    <button id='selectUserBtn' type='button' className='act' onClick={deleteUser}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                </dt>
                                <dd id='userList'>
                                    <div className='tableContenter'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th width='4%' scope='col'>
                                                        <input type='checkbox' onChange={(e) => util.handleAllCheck(e.target.checked, 'accountIdx', accountList, setCheckedItem)} checked={checkedItem.length === accountList.length && checkedItem.length > 0 ? true : false}/>
                                                    </th>
                                                    <th width='18%' scope='col' className='textLeftIm'>{t('COLUMN.NAME.NAME')}</th>
                                                    <th width='17%' scope='col' className='textLeftIm'>{t('COLUMN.NAME.ID')}</th>
                                                    <th width='17%' scope='col' className='textLeftIm'>{t('COLUMN.NAME.GRADE')}</th>
                                                    <th width='18%' scope='col' className='textLeftIm'>{t('COLUMN.NAME.STATUS')}</th>
                                                    <th width='18%' scope='col' className='textLeftIm'>{t('COLUMN.NAME.UPDATE_DATE')}</th>
                                                </tr>
                                            </thead>
                                            <tbody className='maxHi260'>
                                                { accountList && accountList.map((account, index) => 
                                                    <tr key={index}>
                                                        <td width='4%'>
                                                            <input type='checkbox' name={`select-${account.accountIdx}`} onChange={(e) => util.handleSingleCheck(e.target.checked, account.accountIdx, checkedItem, setCheckedItem)} checked={checkedItem.includes(account.accountIdx) ? true : false} />
                                                        </td>
                                                        <td width='18%' scope='col' className='textLeftIm'>{account.name}</td>
                                                        <td width='17%' scope='col' className='textLeftIm'>{account.accountId}</td>
                                                        <td width='17%' scope='col' className='textLeftIm'>{account.grade}</td>
                                                        <td width='18%' scope='col' className='textLeftIm'>{account.status === 1 ? t('COLUMN.NAME.USE') : t('COLUMN.NAME.BAN')}</td>
                                                        <td width='18%' scope='col' className='textLeftIm'>{account.updateDatetime}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button type='button' className='btns btns-default btns-sm' onClick={modalClose}>{t('COLUMN.NAME.CANCEL')}</button>
                </div>
            </div>
        </div>
        </>
    )
}