import React, { useState } from 'react'

// lang
import { useTranslation } from 'react-i18next'
import BackgroundColor from 'BackgroundColor'

// login wrapper
import LoginWrapper from 'component/wrapper/login/LoginWrapper'

// action
import * as AccountAction from 'action/AccountAction'

// image
import login_logo from 'images/login_logo_w.png'

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faUser, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons'

export default function LoginContainer() {
  const { t } = useTranslation()

  const[account, setAccount] = useState({
    id: '',
    password: ''
  })

  function handleChange(e) {
    const {id, value} = e.target
    setAccount({
      ...account,
      [id]: value
    })
  }

  async function login() {
    await AccountAction.login(account)
  }

  return (
    <>
    <BackgroundColor />
    <div className='loginBk'>
      <LoginWrapper>
        <h1><img src={login_logo} alt='logo' />
          <span>
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </h1>
        <div className='loginPage'>
          <dl>
            <dd><FontAwesomeIcon icon={faUser} /><input type="text" placeholder={t('MENU.NAME.ID')} value={account.id} id="id" onChange={handleChange} /></dd>
            <dd><FontAwesomeIcon icon={faUnlockKeyhole} /><input type="password" placeholder={t('MENU.NAME.PASSWORD')} value={account.password} id="password" onChange={handleChange} /></dd>
          </dl>
          <p><input type="button" value={t('MENU.NAME.LOGIN')} onClick={login} /></p>
        </div>
      </LoginWrapper>
    </div>
    </>
  )
}