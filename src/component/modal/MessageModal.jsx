import { useTranslation } from "react-i18next"
import { useDispatch } from 'react-redux'

import { modalClose } from 'util/redux/modal'

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function MessageModal({ message, isButton, func }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    function close() {
        dispatch(modalClose())
    }

    function clickApplyButton() {
        func(true)
    }
    
    return (
        <>
        <div>
            <div className='modalMessageForm c-message-modal-dialog'>
                <div className='modal-contents'>
                    <div className='modal-headers' >
                        <span className='modal-titles'></span>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={close}>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                    <div className='modal-message-body'>
                        <div className='modal-body-img'>
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                        </div>                
                        <div className='modal-body-text'>{message}</div>
                    </div>            
                    <div className='modal-footer'>
                        {isButton ? <button type='button' className='btns btns-primary btns-sm' onClick={clickApplyButton}>{t('COLUMN.NAME.CONFIRM')}</button> : <></> }
                        <button type='button' className='btns btns-default btns-sm' onClick={close}>{t('COLUMN.NAME.CLOSE')}</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}