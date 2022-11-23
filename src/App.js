import React, { useEffect, useState } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'

// lang
import { useTranslation } from 'react-i18next'

// router
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// container
import LoginContainer from 'container/LoginContainer'
import { modalToggle } from 'util/redux/modal'
import MainContainer from 'container/MainContainer'

function App() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const modal = useSelector(state => state.modal)
  
  useEffect(() => {
    
  }, [])

  function modalTog() {
    dispatch(modalToggle())
  }

  return (
    <>
    {modal.isOpen ? 
    <></>
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
