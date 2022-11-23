// route
import React from "react"
import { Route, Routes } from "react-router-dom"
import { Link } from 'react-router-dom';

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPeopleGroup, faFile, faClock } from '@fortawesome/free-solid-svg-icons'

// state
import { useState } from "react"

export default function ManagerLeftWrapper() {

    return (
        <div id='__layoutLeftSlideMenu' className='fl_leftWrap adminLeftWrap'>
            <div className='fl_leftBox'>
                <div className='fl_leftNavBox'>
                    <div className='leftUserNav'>
                        <ul>
                            <li>
                                <Link to='/main/manager/user' className='leftMenuItem'>
                                    <FontAwesomeIcon icon={faUser} />
                                    &nbsp;사용자 관리
                                </Link>
                            </li>
                            <li>
                                <Link to='/main/manager/group' className='leftMenuItem'>
                                    <FontAwesomeIcon icon={faPeopleGroup} />
                                    &nbsp;그룹 관리
                                </Link>
                            </li>
                            <li>
                                <Link to='/main/manager/file' className='leftMenuItem'>
                                    <FontAwesomeIcon icon={faFile} />
                                    &nbsp;파일 관리
                                </Link>
                            </li>
                            <li>
                                <Link to='/main/manager/log' className='leftMenuItem'>
                                    <FontAwesomeIcon icon={faClock} />
                                    &nbsp;로그 관리
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}