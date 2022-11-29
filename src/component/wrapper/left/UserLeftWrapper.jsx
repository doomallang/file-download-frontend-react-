// route
import React from "react"
import { Link } from 'react-router-dom';

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faFile } from '@fortawesome/free-solid-svg-icons'

export default function UserLeftWrapper() {

    return (
        <div id='__layoutLeftSlideMenu' className='fl_leftWrap adminLeftWrap'>
            <div className='fl_leftBox'>
                <div className='fl_leftNavBox'>
                    <div className='leftUserNav'>
                        <ul>
                            <li>
                                <Link to='/main/user/account' className='leftMenuItem'>
                                    <FontAwesomeIcon icon={faUser} />
                                    &nbsp;사용자 관리
                                </Link>
                            </li>
                            <li>
                                <Link to='/main/user/file' className='leftMenuItem'>
                                    <FontAwesomeIcon icon={faFile} />
                                    &nbsp;파일 관리
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}