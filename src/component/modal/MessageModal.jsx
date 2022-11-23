import { useTranslation } from "react-i18next"

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function MessageModal({ message, close, useApplyButton, propFunction }) {
    const { t } = useTranslation()

    function clickApplyButton() {
        propFunction(true)
    }

    return (
        <>
        <div>
            <div className='modalMessageForm c-message-modal-dialog'>
                <div className='modal-contents'>
                    <div className='modal-headers' >
                        <span className='modal-titles'></span>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
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
                        {useApplyButton ? <button type='button' className='btns btns-primary btns-sm' onClick={clickApplyButton}>{t('COLUMN.NAME.CONFIRM')}</button> : <></> }
                        <button type='button' className='btns btns-default btns-sm' onClick={close}>{t('COLUMN.NAME.CLOSE')}</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}