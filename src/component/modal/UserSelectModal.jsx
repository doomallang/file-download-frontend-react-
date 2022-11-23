// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import * as AccountAction from 'action/AccountAction'

import { useEffect, useState } from 'react'

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

    // checkbox
    function handleSingleCheck(checked, accountIdx) {
        if(checked) {
            setCheckedItem(prev => [...prev, accountIdx])
        } else {
            setCheckedItem(checkedItem.filter((el) => el !== accountIdx))
        }
    }

    function handleAllCheck(checked) {
        if(checked) {
            const idxArray = []
            accountList.forEach((el) => idxArray.push(el.accountIdx))
            setCheckedItem(idxArray)
        } else {
            setCheckedItem([])
        }
    }

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
                        <span>사용자 선택</span>
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
                                            <option value='userName'>이름</option>
                                            <option value='userName'>아이디</option>
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
                                                            <input type='checkbox' onChange={(e) => handleAllCheck(e.target.checked)} checked={checkedItem.length === accountList.length && checkedItem.length > 0 ? true : false} />
                                                        </th>
                                                        <th width='18%' scope='col' className='textLeftIm'>이름</th>
                                                        <th width='17%' scope='col' className='textLeftIm'>아이디</th>
                                                        <th width='17%' scope='col' className='textLeftIm'>직급</th>
                                                        <th width='18%' scope='col' className='textLeftIm'>상태</th>
                                                        <th width='18%' scope='col' className='textLeftIm'>부서</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='maxHi260'>
                                                { accountList && accountList.map((account, index) => 
                                                    <tr key={index}>
                                                        <td width='4%'>
                                                            <input type='checkbox' name={`select-${account.accountIdx}`} onChange={(e) => handleSingleCheck(e.target.checked, account.accountIdx)} checked={checkedItem.includes(account.accountIdx) ? true : false}/>
                                                        </td>
                                                        <td width='18%' scope='col' className='textLeftIm'>{account.name}</td>
                                                        <td width='17%' scope='col' className='textLeftIm'>{account.accountId}</td>
                                                        <td width='17%' scope='col' className='textLeftIm'>{account.grade}</td>
                                                        <td width='18%' scope='col' className='textLeftIm'>{account.status}</td>
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
                    <button type='button' className='btns btns-primary btns-sm' onClick={addCheckedUser}>확인</button>
                    <button type='button' className='btns btns-default btns-sm' onClick={close}>닫기</button>
                </div>
            </div>
        </div>
    )
}