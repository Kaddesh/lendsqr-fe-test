import React from 'react'
import loginImg from '../../assets/images/loginimg.png'
import lendLogo from '../../assets/icons/lend-Logo.svg'
import './Login.scss';
import LoginForm from '../../components/Auth/LoginForm'

export const LoginPage = () => {
  return (
    <div className="login-page">
        <div className='login-page__logo'>
            <img src={lendLogo} alt="lend-logo" />
        </div>
      <div className="login-page__inner">
        <div className="login-page__art">
          <img src={loginImg} className="login-page__img" alt="Login" />
        </div>

        <div className="login-page__content">
          
          <div className="login-page__header">.
            <div className='login-page__logo-mobile'>
            <img src={lendLogo} alt="lend-logo-mobile" />
        </div>
            <h1 className="login-page__title">Welcome!</h1>
            <p className="login-page__subtitle">Enter details to log in</p>
          </div>

          <LoginForm onSubmit={(data) => console.log('logged in', data)} className="login-form" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;