import React, { useEffect, useState } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'

// lang
import { useTranslation } from 'react-i18next'

// router
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// container
import LoginContainer from 'container/LoginContainer'
import MainContainer from 'container/MainContainer'
import MessageModal from 'component/modal/MessageModal'

function App() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const modal = useSelector(state => state.modal)
  
  useEffect(() => {

  }, [])

  return (
    <>
    {modal.isOpen ? 
    <MessageModal message={modal.message} isButton={modal.isButton} func={modal.func} />
    : <></>}
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<LoginContainer />} />
        <Route path = "/main/*" element={<MainContainer />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
