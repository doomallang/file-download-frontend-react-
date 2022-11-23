// route
import React from "react"
import { Route, Routes } from "react-router-dom"

// lang
import { useTranslation } from 'react-i18next'

// image
import logoImg from 'images/login_logo_w.png'
import userImg from 'images/user_img_bk.png'

// bootstrap
import { Dropdown } from 'react-bootstrap'

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsUpDownLeftRight, faGear, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"

export default function HeaderWrapper() {
    const { t } = useTranslation()

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
    );

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
                        <a href='#' id='__layoutLeftSlideTopMenuBtn' title='화면 크게보기'>
                            <FontAwesomeIcon icon={faArrowsUpDownLeftRight} />
                        </a>
                    </li>
                    <li>
                        <a href='#' id='__layoutLeftSlideTopMenuBtn' title='사용자/관리자 메인'>
                            <FontAwesomeIcon icon={faGear} />
                        </a>
                    </li>
                </ul>
            </div>
            
            <div id='__layoutMainTopInfo' className='loginWrap'>
                <Dropdown id='__layoutTopUserInfoArea'>
                    <Dropdown.Toggle as={CustomToggle}>
                        <a href='#'>
                            <span className='userImg'><img src={userImg} /></span>
                            <span id='__layoutMainUserInfoUserName'>관리자</span>
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
                                    <b>관리자</b>
                                </a>
                                <a href='#' id='__layoutMainUserInfoLogoutBtn'>로그아웃</a>
                            </dt>
                            <dd>
                                <ul>
                                    <li>
                                        <b>부서</b>
                                    </li>
                                    <li>
                                        <b>비밀번호</b>
                                        <a href='#' id='__layoutMainUserInfoChangePasswordBtn' title='비밀번호 변경' className='smallBtn'>비밀번호 변경</a>
                                    </li>
                                    <li>
                                        <b>사원번호</b>
                                        <span>1111111</span>
                                    </li>
                                    <li>
                                        <b>역할</b>
                                        <ul>
                                            <li>
                                                <span>관리자</span>
                                            </li>
                                        </ul>
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