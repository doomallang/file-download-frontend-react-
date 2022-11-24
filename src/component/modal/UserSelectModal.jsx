import * as util from 'util/util'

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import * as AccountAction from 'action/AccountAction'

import { useEffect, useState } from 'react'
import { t } from 'i18next'

export default function UserSelectModal({ close, addUser }) {
    const [accountList, setAccountList] = useState([])
    const [accountCount, setAccountCount] = useState(0)
    const [checkedItem, setCheckedItem] = useState([])
    const params = {
        pageSize: 20,
        startIndex: 0,
        searchText: '',
        searchTextOption: 'account_id'
    }

    useEffect(() => {
        async function getAccountList() {
            const data = await AccountAction.getAccountList(params)
            await setAccountList(data.list)
            await setAccountCount(data.listCount)
        }
        getAccountList()
    }, [])

    function addCheckedUser() {
        const returnList = []
        accountList.forEach(el => {
            if(checkedItem.includes(el.accountIdx)) {
                returnList.push(el)
            }
        })
        addUser(returnList)
    }

    return (
        <div className='modalSelectForm c-user-modal-dialog'>
            <div className='modal-contents'>
                <div className='modal-headers'>
                    <span className='modal-titles'>
                        <span>{t('COLUMN.NAME.SELECT_USER')}</span>
                    </span>
                    <button type='button' className='close' onClick={close}>
                        <span aria-hidden='true'>x</span>
                    </button>
                </div>
                <div className='modal-body'>
                    <form>
                        <div className='modalBox'>
                            <div className='modalList'>
                                <dl>
                                    <div>
                                        <select id='searchTextOption' className='wid100'>
                                            <option value='userName'>{t('COLUMN.NAME.NAME')}</option>
                                            <option value='userName'>{t('COLUMN.NAME.ID')}</option>
                                        </select>
                                        <input type='text' id='searchText' placeholder='검색' className='wid100' />
                                        <button id='searchBtn' type='button'>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                    </div>
                                </dl>
                                <dl className='modalWidthBox'>
                                    <dd id='userList'>
                                        <div className='tableContenter'>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th width='4%' scope='col'>
                                                            <input type='checkbox' onChange={(e) => util.handleAllCheck(e.target.checked, 'accountIdx', accountList, setCheckedItem)} checked={checkedItem.length === accountList.length && checkedItem.length > 0 ? true : false} />
                                                        </th>
                                                        <th width='18%' scope='col' className='textLeftIm'>{t('COLUMN.NAME.NAME')}</th>
                                                        <th width='17%' scope='col' className='textLeftIm'>{t('COLUMN.NAME.ID')}</th>
                                                        <th width='17%' scope='col' className='textLeftIm'>{t('COLUMN.NAME.GRADE')}</th>
                                                        <th width='18%' scope='col' className='textLeftIm'>{t('COLUMN.NAME.STATUS')}</th>
                                                        <th width='18%' scope='col' className='textLeftIm'>{t('COLUMN.NAME.GROUP')}</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='maxHi260'>
                                                { accountList && accountList.map((account, index) => 
                                                    <tr key={index}>
                                                        <td width='4%'>
                                                            <input type='checkbox' name={`select-${account.accountIdx}`} onChange={(e) => util.handleSingleCheck(e.target.checked, account.accountIdx, checkedItem, setCheckedItem)} checked={checkedItem.includes(account.accountIdx) ? true : false}/>
                                                        </td>
                                                        <td width='18%' scope='col' className='textLeftIm'>{account.name}</td>
                                                        <td width='17%' scope='col' className='textLeftIm'>{account.accountId}</td>
                                                        <td width='17%' scope='col' className='textLeftIm'>{account.grade}</td>
                                                        <td width='18%' scope='col' className='textLeftIm'>{account.status === 1 ? t('COLUMN.NAME.USE') : t('COLUMN.NAME.BAN')}</td>
                                                        <td width='18%' scope='col' className='textLeftIm'>{account.groupName}</td>
                                                    </tr>
                                                )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='modal-footer'>
                    <button type='button' className='btns btns-primary btns-sm' onClick={addCheckedUser}>{t('COLUMN.NAME.CONFIRM')}</button>
                    <button type='button' className='btns btns-default btns-sm' onClick={close}>{t('COLUMN.NAME.CLOSE')}</button>
                </div>
            </div>
        </div>
    )
}