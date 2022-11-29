// route
import { useEffect, useState } from "react"
import React from "react"

// lang
import { useTranslation } from 'react-i18next'

// image
import logoImg from 'images/login_logo_w.png'
import userImg from 'images/user_img_bk.png'

// bootstrap
import { Dropdown } from 'react-bootstrap'

// ACTION
import * as AccountAction from 'action/AccountAction'

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faCaretDown } from '@fortawesome/free-solid-svg-icons'

export default function HeaderWrapper() {
    const url = window.location.href
    const { t } = useTranslation()

    const [account, setAccount] = useState({})

    useEffect(() => {
        getAccountInfo()
    }, [])

    async function getAccountInfo() {
        const accountInfo = await AccountAction.getAccountInfo()
        await setAccount(accountInfo)
    }

    function replaceUrl(value) {
        if(value === 'manager') {
            window.location.replace('/main/manager/account')
        } else {
            window.location.replace('/main/user/account')
        }
    }

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <dt
            className='dropdown-toggle'
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </dt>
    ));

    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            const [value, setValue] = useState('');      
            return (
                <dd
                    ref={ref}
                    style={style}
                    className={className + ' loginInfo'}
                    aria-labelledby={labeledBy}
                >
                {React.Children.toArray(children).filter(
                (child) =>
                    !value || child.props.children.toLowerCase().startsWith(value),
                )}
                </dd>
            );
        },
    )

    return (
        <>
        <div className='fl_header'>
            <h1>
                <a id='__layoutMainTopLogoBtn' href='#'>
                    <img src={logoImg} alt='엔파우치 다운로드'/>
                </a>
            </h1>
            <div className='headerNav'>
                <ul>
                    <li>
                        {url.includes('manager') ?
                            <a href='#' className='leftMenuItem' onClick={() => replaceUrl('user')}>
                                <FontAwesomeIcon icon={faUser}/>
                            </a>
                            : 
                            <a href='#' className='leftMenuItem' onClick={() => replaceUrl('manager')}>
                                <FontAwesomeIcon icon={faGear}/>
                            </a>
                        }
                    </li>
                </ul>
            </div>
            
            <div id='__layoutMainTopInfo' className='loginWrap'>
                <Dropdown id='__layoutTopUserInfoArea'>
                    <Dropdown.Toggle as={CustomToggle}>
                        <a href='#'>
                            <span className='userImg'><img src={userImg} /></span>
                            <span id='__layoutMainUserInfoUserName'>{account.name}</span>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </a>
                    </Dropdown.Toggle>
                    <Dropdown.Menu as={CustomMenu} id='__layoutMainUserInfo'>
                        <dl>
                            <dt>
                                <span className='userBigImg'>
                                    <img src={userImg} />
                                </span>
                                <a href='#' id='__layoutMainUserInfoUpdateBtn'>
                                    <b>{account.name}({account.accountId})</b>
                                </a>
                                <a href='#' id='__layoutMainUserInfoLogoutBtn'>로그아웃</a>
                            </dt>
                            <dd>
                                <ul>
                                    <li>
                                        <b>{t('COLUMN.NAME.GROUP')}</b>
                                        <span>{account.groupName}</span>
                                    </li>
                                    <li>
                                        <b>{t('COLUMN.NAME.PASSWORD')}</b>
                                        <a href='#' id='__layoutMainUserInfoChangePasswordBtn' title='비밀번호 변경' className='smallBtn'>{t('COLUMN.NAME.PASSWORD_CHANGE')}</a>
                                    </li>
                                    <li>
                                        <b>{t('COLUMN.NAME.GRADE')}</b>
                                        <span>{account.grade}</span>
                                    </li>
                                    <li>
                                        <b>{t('COLUMN.NAME.ROLE')}</b>
                                        <span></span>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
        </>
    )
}