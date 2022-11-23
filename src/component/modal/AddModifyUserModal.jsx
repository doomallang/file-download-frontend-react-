import { useTranslation } from 'react-i18next'

export default function AddModifyUserModal({ modalClose, grades, handleChange, statusChange }) {
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
                   <form autocomplete='off'>
                        <div id='ransomCruncherDetectPolicyInfo' className='modalBox'>
                            <dl className='layoutWrap'>
                                <dt>
                                    <label>{t('COLUMN.NAME.ID')}</label> 
                                </dt>
                                <dd>
                                    <input type='text' id='accountId' onChange={handleChange} />
                                </dd>
                            </dl>
                            <dl className='layoutWrap'>
                                <dt>
                                    <label>{t('COLUMN.NAME.NAME')}</label> 
                                </dt>
                                <dd>
                                    <input type='text' id='name' onChange={handleChange} />
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
                                    <select id='grade' onChange={handleChange}>
                                        {grades && grades.map((grade) =>
                                            <option value={grade}>{grade}</option>
                                        )}
                                    </select>
                                </dd>
                            </dl>
                            <dl className='layoutWrap'>
                                <dt>
                                    <label>{t('COLUMN.NAME.GROUP')}</label>
                                </dt>
                                <dd>
                                    <input type='text' id='group' />
                                </dd>
                            </dl>
                            <dl className='layoutWrap'>
                                <dt>
                                    <label>{t('COLUMN.NAME.STATUS')}</label>
                                </dt>
                                <dd>
                                    <input type='radio' id='statusPermit' name='status' value='1' onChange={statusChange} checked /> <label for='statusPermit'>사용</label>
                                    <input type='radio' id='statusDeny' name='status' value='0' onChange={statusChange} /> <label for='statusDeny'>중지</label>
                                </dd>
                            </dl>
                        </div>
                    </form>
                </div>
                <div className='modal-footer'>
                    <button type='button' className='btns btns-primary btns-sm'>{t('COLUMN.NAME.REGIST')}</button>
                    <button type='button' className='btns btns-default btns-sm' onClick={modalClose}>{t('COLUMN.NAME.CANCEL')}</button>
                </div>
            </div>
        </div>
    )
}