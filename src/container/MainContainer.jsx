// route
import HeaderWrapper from "component/wrapper/header/HeaderWrapper"
import ManagerLeftWrapper from "component/wrapper/left/ManagerLeftWrapper"
import ManagerGroupWrapper from "component/wrapper/manager/ManagerGroupWrapper"
import ManagerUserWrapper from "component/wrapper/manager/ManagerUserWrapper"
import { Route, Routes } from "react-router-dom"

export default function MainContainer() {
    return (
        <>
            <div className="fl_wrapper">
                <HeaderWrapper />
                <div className='fl_container'>
                    <ManagerLeftWrapper />
                    <Routes>
                        <Route path = "manager/user" element={<ManagerUserWrapper />} />
                        <Route path = "manager/group" element={<ManagerGroupWrapper />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}