import GroupTree from "component/tree/GroupTree"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import * as GroupAction from 'action/GroupAction'

export default function SelectGroupModal({ groupLists, close, applySelectGroup } ) {
    const { t } = useTranslation()

    const [groupList, setGroupList] = useState(groupLists)
    const [selectGroup, setSelectGroup] = useState({groupKey: '', groupName: ''})

    async function getSelectGroupList(key, groupIdx) {
        const list = await GroupAction.getSelectGroupList(key)
        const treeList = await GroupAction.makeTreeList(list, groupIdx)
        return await treeList
    }

    function submitSelectGroup() {
        applySelectGroup(selectGroup)
    }

    return (
        <>
        <div>
            <div className='modalGroupForm c-group-modal-dialog'>
                <div className='modal-contents'>
                    <div className='modal-headers' >
                        <span className='modal-titles'></span>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                    <div className='modal-group-body'>
                        <GroupTree list={groupList} getSelectGroupList={getSelectGroupList} setSelectGroup={setSelectGroup} />
                    </div>            
                    <div className='modal-footer'>
                        <button type='button' className='btns btns-primary btns-sm' onClick={submitSelectGroup}>{t('COLUMN.NAME.APPLY')}</button>
                        <button type='button' className='btns btns-default btns-sm' onClick={close}>{t('COLUMN.NAME.CLOSE')}</button>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}