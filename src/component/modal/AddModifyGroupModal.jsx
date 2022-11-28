import * as util from 'util/util'

import { useTranslation } from 'react-i18next'

export default function AddModifyGroupModal({ modalClose, addModifyGroup, group, openSelectGroupModal, handleChange }) {
    const { t } = useTranslation()

    return (
        <div className='modalForm c-ui-modal-dialog'>
            <div className='modal-contents'>
                <div className='modal-headers'>
                    <span className='modal-titles'>
                        <span>{t('COLUMN.NAME.ADD_MODIFY_GROUP')}</span>
                    </span>
                    <button type='button' className='close' onClick={modalClose}>
                        <span aria-hidden='true'>x</span>
                    </button>
                </div>
                <div className='modal-body'>
                   <form autoComplete='off'>
                        <div id='ransomCruncherDetectPolicyInfo' className='modalBox'>
                            <dl className='layoutWrap'>
                                <dt>
                                    <label>{t('COLUMN.NAME.GROUP_NAME')}</label> 
                                </dt>
                                <dd>
                                    <input type='text' id='groupName' onChange={handleChange} value={group.groupName} />
                                </dd>
                            </dl>
                            <dl className='layoutWrap'>
                                <dt>
                                    <label>{t('COLUMN.NAME.REPRESENTATIVE_NUMBER')}</label> 
                                </dt>
                                <dd>
                                    <input type='text' id='phoneNumber' onChange={handleChange} value={group.phoneNumber} />
                                </dd>
                            </dl>
                            <dl className='layoutWrap'>
                                <dt>
                                    <label>{t('COLUMN.NAME.PARENT_GROUP')}</label> 
                                </dt>
                                <dd>
                                    <span>{group.parentGroupName}</span>
                                    &nbsp;
                                    <button type='button' className='btns btns-default btns-sm' onClick={openSelectGroupModal}>{t('BUTTON.NAME.SELECT_GROUP')}</button>
                                </dd>
                            </dl>
                        </div>
                    </form>
                </div>
                <div className='modal-footer'>
                    <button type='button' className='btns btns-primary btns-sm' onClick={addModifyGroup}>{t('COLUMN.NAME.REGIST')}</button>
                    <button type='button' className='btns btns-default btns-sm' onClick={modalClose}>{t('COLUMN.NAME.CANCEL')}</button>
                </div>
            </div>
        </div>
    )
}