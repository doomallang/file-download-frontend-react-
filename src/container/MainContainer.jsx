// HEAD
import HeaderWrapper from "component/wrapper/header/HeaderWrapper"

// LEFT
import ManagerLeftWrapper from "component/wrapper/left/ManagerLeftWrapper"
import UserLeftWrapper from "component/wrapper/left/UserLeftWrapper"

// WRAPPER
import ManagerGroupWrapper from "component/wrapper/manager/ManagerGroupWrapper"
import ManagerAccountWrapper from "component/wrapper/manager/ManagerAccountWrapper"
import UserAccountWrapper from "component/wrapper/user/UserAccountWrapper"

import { Route, Routes } from "react-router-dom"

export default function MainContainer() {
    const url = window.location.href
    return (
        <>
            <div className="fl_wrapper">
                <HeaderWrapper url={window.location.href} />
                <div className='fl_container'>
                    {url.includes('manager') ?
                        <ManagerLeftWrapper />
                        : 
                        <UserLeftWrapper />
                    }
                    <Routes>
                        <Route path = "manager/account" element={<ManagerAccountWrapper />} />
                        <Route path = "manager/group" element={<ManagerGroupWrapper />} />
                        <Route path = "user/account" element={<UserAccountWrapper />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}