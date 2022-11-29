import { useTranslation } from 'react-i18next'

export default function AddModifyUserModal({ modalClose, grades, handleChange, statusChange, openSelectGroupModal, addModifyUser, account, isReadOnly }) {
    const { t } = useTranslation()

    return (
        <div className='modalForm c-ui-modal-dialog'>
            <div className='modal-contents'>
                <div className='modal-headers'>
                    <span className='modal-titles'>
                        <span>사용자 추가</span>
                    </span>
                    <button type='button' className='close' onClick={modalClose}>
                        <span aria-hidden='true'>x</span>
                    </button>
                </div>
                <div className='modal-body'>
                    <form>
                        <div id='ransomCruncherDetectPolicyInfo' className='modalBox'>
                            <dl className='layoutWrap'>
                                <dt>
                                    <label>{t('COLUMN.NAME.ID')}</label> 
                                </dt>
                                <dd>
                                    <input type='text' id='accountId' onChange={handleChange} value={account.accountId} readOnly={isReadOnly ? 'readOnly' : ''} />
                                </dd>
                            </dl>
                            <dl className='layoutWrap'>
                                <dt>
                                    <label>{t('COLUMN.NAME.NAME')}</label> 
                                </dt>
                                <dd>
                                    <input type='text' id='name' onChange={handleChange} value={account.name} />
                                </dd>
                            </dl>
                            <dl className='layoutWrap'>
                                <dt>
                                    <label>{t('COLUMN.NAME.PASSWORD')}</label>
                                </dt>
                                <dd>
                                    <input type='password' id='password' onChange={handleChange} />
                                </dd>
                            </dl>
                            <dl className='layoutWrap'>
                                <dt>
                                    <label>{t('COLUMN.NAME.GRADE')}</label>
                                </dt>
                                <dd>
                                    <select id='grade' onChange={handleChange} value={account.grade === null ? grades[0] : account.grade}>
                                        {grades && grades.map((grade, index) =>
                                            <option key={index} value={grade}>{grade}</option>
                                        )}
                                    </select>
                                </dd>
                            </dl>
                            <dl className='layoutWrap'>
                                <dt>
                                    <label>{t('COLUMN.NAME.GROUP')}</label>
                                </dt>
                                <dd>
                                    <label>{account.groupName}</label>
                                    <button type='button' className='btns btns-default btns-sm' onClick={openSelectGroupModal}>{t('BUTTON.NAME.SELECT_GROUP')}</button>
                                </dd>
                            </dl>
                            <dl className='layoutWrap'>
                                <dt>
                                    <label>{t('COLUMN.NAME.STATUS')}</label>
                                </dt>
                                <dd>
                                    <input type='radio' id='statusPermit' name='status' value='0' onChange={statusChange} checked={account.status === 0 ? 'checked' : ''} /> <label>사용</label>
                                    <input type='radio' id='statusDeny' name='status' value='1' onChange={statusChange} checked={account.status === 1 ? 'checked' : ''} /> <label>중지</label>
                                </dd>
                            </dl>
                        </div>
                    </form>
                </div>
                <div className='modal-footer'>
                    <button type='button' className='btns btns-primary btns-sm' onClick={addModifyUser}>{t('COLUMN.NAME.REGIST')}</button>
                    <button type='button' className='btns btns-default btns-sm' onClick={modalClose}>{t('COLUMN.NAME.CANCEL')}</button>
                </div>
            </div>
        </div>
    )
}